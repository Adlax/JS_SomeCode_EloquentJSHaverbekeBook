//Def du plan (map)/////////////////////////////////////////////////////////////
var plan=["############################",
          "#     #  #  o    #         #",
          "#  ###      #              #",
          "#                          #",
          "#  o    #    #             #",
          "#       ##           #     #",
          "# #      ###  ###          #",
          "#       o ##               #",
          "## #              #        #",
          "###       ##          #### #",
          "#          o              ##",
          "############################"];


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

function randomElement(array){
  return array[Math.floor(Math.random()*array.length)];
}


//BouncingCritter///////////////////////////////////////////////////////////////
function BouncingCritter(){
  this.direction=randomElement(directionsNames);
}

BouncingCritter.prototype.act=function(view){
  if(view.look(this.direction)!=" "){this.direction=view.find(" ")||"s";}
  else{return{type:"move",direction:this.direction};}
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

function BouncingCritter(){
  this.direction=randomElement(directionsNames);
}

BouncingCritter.prototype.act=function(view){
  if(view.look(this.direction)!=" "){this.direction=view.find(" ")||"s";}
  else{return{type:"move",direction:this.direction};}
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

function Wall(){}


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


//this//////////////////////////////////////////////////////////////////////////
var test={
  prop:10,
  addPropTo:function(array){
    return array.map(function(element){return this.prop+element;}.bind(this));
  }
};


//Fonctions a executer//////////////////////////////////////////////////////////
var u=new Vector(1,2);
var v=new Vector(2,3);
console.log(u.plus(v));


var grid=new Grid(5,5);
console.log(grid.isInside(new Vector(1,1)));
console.log(grid.get(new Vector(1,1)));
grid.set(new Vector(1,1),"X");
console.log(grid.get(new Vector(1,1)));

console.log(randomElement(directionsNames));

var world=new World(plan,{"#":Wall,"o":BouncingCritter});
console.log(world.toString());

console.log(test.addPropTo([1,2,3,4,5]));

//Test final
for(var i=0;i<5;i++)
{
  world.turn();
  console.log(world.toString());
}
