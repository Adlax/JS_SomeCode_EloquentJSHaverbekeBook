//Def du plan (map)/////////////////////////////////////////////////////////////
var plan=["############################",
          "#   **#  #  o    #         #",
          "#  ###***   #        ***   #",
          "#        ****         **   #",
          "#  o    #    #          *  #",
          "#       ##   ***     #     #",
          "# #      ###  ###          #",
          "#  ***    o ##    ***      #",
          "## #  **          #   **   #",
          "###       ##      ****#### #",
          "#          o     ****     ##",
          "############################"];

var legend={"#":Wall,"o":PlantEater,"*":Plant};


//Vector////////////////////////////////////////////////////////////////////////
function Vector(x, y) {
  this.x = x;
  this.y = y;
}
Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};


//Grid//////////////////////////////////////////////////////////////////////////
function Grid(width, height) {
  this.space = new Array(width * height);
  this.width = width;
  this.height = height;
}
Grid.prototype.isInside = function(vector) {
  return (vector.x>=0 && vector.y>=0 && vector.x<this.width && vector.y<this.height);
};

Grid.prototype.get=function(vector) {
  return this.space[vector.x + vector.y * this.width];
};

Grid.prototype.set=function(vector,value){
  this.space[vector.x+(vector.y*this.width)]=value;
};

Grid.prototype.forEach=function(f,context){
  for(var y=0;y<this.height;y++){
    for(var x=0;x<this.width;x++){
      var value=x+y*(this.width);
      if(this.space[value] != null){f.call(context,value,new Vector(x,y));}
    }
  }
};


//Directions////////////////////////////////////////////////////////////////////
var directions={
  "n":new Vector(0,-1),
  "ne":new Vector(1,-1),
  "e":new Vector(1,0),
  "se":new Vector(1,1),
  "s":new Vector(0,1),
  "sw":new Vector(-1,1),
  "w":new Vector(-1,0),
  "nw":new Vector(-1,-1),
}

var directionsNames="n ne e se s sw w nw".split(" ");


//randome d un tableau//////////////////////////////////////////////////////////
function randomElement(array){
  return array[Math.floor(Math.random()*array.length)];
}


//Wall//////////////////////////////////////////////////////////////////////////
function Wall(){}


//BouncingCritter///////////////////////////////////////////////////////////////
function BouncingCritter(){
  this.direction=randomElement(directionsNames);
}

BouncingCritter.prototype.act=function(view){
  if(view.look(this.direction)!=" "){this.direction=view.find(" ")||"s";}
  else{return{type:"move",direction:this.direction};}
};


//WallFollowerCritter///////////////////////////////////////////////////////////
function WallFollower(){
  this.dir="s";
}

function dirPlus(dir,n){
  index=directionsNames.indexOf(dir);
  return directionsNames[(index+n+8)%8];
}

WallFollower.prototype.act=function(view){
  var start=this.dir;
  if(view.look(dirPlus(this.dir,-3))!=" "){
    start=this.dir=dirPlus(this.dir,-2);
  }
  while(view.look(this.dir)!=" "){
    this.dir=dirPlus(this.dir,1);
    if(this.dir==start){break;}
  }
};


//PlantEaterCritter/////////////////////////////////////////////////////////////
function PlantEater(){
  this.energy=20;
}

PlantEater.prototype.act=function(context){
  var space=context.find(" ");
  if(this.energy>60 && space){return {type:"reproduce",direction:space};}
  var plant=context.find("*");
  if(plant){return {type:"eat",direction:plant};}
  if(space){return {type:"move",direction:space};}
};


//Plants////////////////////////////////////////////////////////////////////////
function Plant(){
  this.energy=3+Math.random()*4;
}

Plant.prototype.act=function(context){
  if(this.energy>15){
    var space=context.find(" ");
    if(space){return {type:"reproduce",direction:space};}
  }
  if(this.energy<20){
    return{type:"grow"};
  }
};


//World/////////////////////////////////////////////////////////////////////////
function elementFromChar(legend,ch){
  if(ch==" ") {return null;}
  else{
    var element=new legend[ch]();
    element.originChar=ch;
    return element;
  }
}

function World(map,legend){
  var grid=new Grid(map[0].length,map.length);
  this.grid=grid;
  this.legend=legend;
  map.forEach(function(line,y){
    for(var x=0;x<line.length;x++){
      grid.set(new Vector(x,y),elementFromChar(legend,line[x]));
    }
  });
}

function charFromElement(element){
  if(element==null){return " ";}
  else{
    return element.originChar;
  }
}

World.prototype.toString=function(){
  var output="";
  for(var y=0;y<this.grid.height;y++){
    for(var x=0;x<this.grid.width;x++){
      var element=this.grid.get(new Vector(x,y));
      output += charFromElement(element);
    }
    output += "\n";
  }
  return output;
}

World.prototype.turn=function(){
  var acted=[];
  this.grid.forEach(function(critter,vector){
    if(critter.act && acted.indexOf(critter)==-1){
      acted.push(critter);
      this.letAct(critter,vector);
    }
  },this);
};

World.prototype.letAct=function(critter,vector){
  var action=critter.act(new View(this,vector));
  if(action && action.type=="move"){
    var dest=this.checkDestination(action,vector);
    if(dest && this.grid.get(dest)==null){
      this.grid.set(vector,null);
      this.grid.set(dest,critter);
    }
  }
};

World.prototype.checkDestination=function(action,vector){
  if(directions.hasOwnproperty(action.direction)){
    var dest=vector.plus(directions[action.direction]);
    if(this.grid.isInside(dest)){return dest;}
  }
};


//LifeLikeWorld/////////////////////////////////////////////////////////////////
function LifeLikeWorld(map,legend){
  World.call(this,map,legend);
}

LifeLikeWorld.prototype=Object.create(World.prototype);

LifeLikeWorld.prototype.letAct=function(critter,vector){
  var action=critter.act(new View(this,vector));
  var handled=action && action.type in actionTypes && actionTypes[action.type].call(this,critter,vector,action);
  if(!handled){
    critter.energy-=0.2;
    if(critter.energy<=0){this.grid.set(vector,null);}
  }
};


//Actions///////////////////////////////////////////////////////////////////////
var actionTypes=Object.create(null);

actionTypes.grow=function(critter){
  critter.energy+=0.5;
  return true;
}

actionTypes.move=function(critter,vector,action){
  var dest=this.checkDestination(action,vector);
  if(dest==null || critter.energy<=1 || this.grid.get(dest)!=null){return false;}
  else{
    critter.energy-=1;
    this.grid.set(vector,null);
    this.grid.set(dest,critter);
    return true;
  }
};

actionTypes.eat=function(critter,vector,action){
  var dest=this.checkDestination(action,vector);
  var atDest = dest!=null && this.grid.get(dest);
  if(!atDest||atDest.energy==null){return false;}
  else{
    critter.energy+=atDest.energy;
    this.grid.set(Dest,null);
    return true;
  }
};

actionTypes.reproduce=function(critter,vector,action){
  var baby=elementFromChar(this.legend,critter.originChar);
  var dest=this.checkDestination(action,vector);
  if(dest==null||critter.energy<=2*baby.energy||this.grid.get(dest)!=null){return false;}
  else{
    critter.energy-=baby.energy;
    this.grid.set(dest,baby);
    return true;
  }
};


//View//////////////////////////////////////////////////////////////////////////
function View(world,vector){
  this.world=world;
  this.vector=vector;
}

View.prototype.look=function(dir){
  var target=this.vector.plus(directions[dir]);
  if(this.world.grid.isInside(target)){return charFromElement(this.world.grid.get(target));}
  else{return "#";}
}

View.prototype.findAll=function(ch){
  var found=[];
  for(var dir in directions){
    if(this.look(dir)==ch){found.push[dir];}
  }
  return found;
};

View.prototype.find=function(ch){
  var found=this.findAll(ch);
  if(found.length==0){return null;}
  else{
    return randomElement(found);
  }
};


//Fonctions a executer//////////////////////////////////////////////////////////


//Test final
var jungle=new LifeLikeWorld(plan,legend);
for(var i=0;i<5;i++)
{
  jungle.turn();
  console.log(jungle.toString());
}
