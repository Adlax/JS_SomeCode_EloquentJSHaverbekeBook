<p> Normal HTML here. </p>
<svg xmlns="http://www.w3.org/2000/svg">
  <circle r="50" cx="50" cy="50" fill="red"/>
  <rect x="120" y="5" width="90" height="90" stroke="blue" fill="none"/>
</svg>

<script>
	var circle = document.querySelector("circle");
	circle.setAttribute("fill","cyan");
</script>

////////////////////////////////////////////////////////////////////////////////

<p> Before canvas </p>
<canvas width="120" height="60"> </canvas>
<p> After canvas </p>
<script>
  var canvas = document.querySelector("canvas");
  var context = canvas.getcontext("2d");
  context.fillStyle = "red";
  context.fillRect(10,10,100,50);
</script>

////////////////////////////////////////////////////////////////////////////////

<canvas> </canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");
  cx.strokeStyle = "blue";
  cx.strokeRect(5,5,50,50);
  cx.lineWidth = 5;
  cx.strokeRect(135,5,50,50);
</script>

////////////////////////////////////////////////////////////////////////////////

<canvas> </canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");
  cx.beginPath();
  for(var y = 10; y < 100; y+=10){
    cx.moveTo(10,y);
    cx.lineTo(90,y);
  }
  cx.stroke();
</script>

////////////////////////////////////////////////////////////////////////////////

<canvas> </canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");
  cx.beginPath();
  cx.moveTo(50,10);
  cx.lineTo(10,70);
  cx.lineTo(90,70);
  cx.fill();
</script>

////////////////////////////////////////////////////////////////////////////////

<canvas> </canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");
  cx.beginPath();
  cx.moveTo(10,90);
  cx.quadraticCurveTo(60,10,90,90);
  cx.lineTo(60,10);
  cx.closePath();
  cx.stroke();
</script>

////////////////////////////////////////////////////////////////////////////////

<canvas> </canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");
  cx.beginPath();
  cx.moveTo(10,90);
  cx.bezierCurveTo(10,10,90,10,50,90);
  cx.lineTo(90,10);
  cx.lineTo(10,10);
  cx.closePath();
  cx.stroke();
</script>

////////////////////////////////////////////////////////////////////////////////

<canvas> </canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");
  cx.beginPath();
  cx.moveTo(10,10);
  cx.arcTo(90,10,90,90,20);
  cx.moveTo(10,10);
  cx.arcTo(90,10,90,90,80);
  cx.stroke();
</script>

////////////////////////////////////////////////////////////////////////////////

<canvas> </canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");
  cx.beginPath();
  cx.arc(50,50,40,0,7);
  cx.arc(150,50,40,0,0.5*Math.PI);
  cx.stroke();
</script>

////////////////////////////////////////////////////////////////////////////////

<canvas width="200" height="200"> </canvas>
<script>
  var results = [
  {name:"Satisfied", count:1043, color:"lightblue"},
  {name:"Neutral", count:563, color:"lightgreen"},
  {name:"Unsatisfied", count:510, color:"pink"},
  {name:"No Comment", count:175, color:"silver"}
	];
  var cx = document.querySelector("canvas").getContext("2d");
  var total = results.reduce(function(sum,choice){
    return sum + choice.count;
  },0);
  console.log(total);
  var currentAngle = -0.5 * Math.PI;
  results.forEach(function(result){
    var sliceAngle = (result.count / total) * 2 *Math.PI;
    cx.beginPath();
    cx.arc(100,100,100,currentAngle,currentAngle + sliceAngle);
    currentAngle += sliceAngle;
    cx.lineTo(100,100);
    cx.fillStyle = result.color;
    cx.fill();
  });
</script>

////////////////////////////////////////////////////////////////////////////////

<canvas width="300" height="200"> </canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");
  cx.font = "28px Georgia";
  cx.fillStyle = "fuchsia";
  cx.fillText("I can draw with my penis",10,50);
</script>

////////////////////////////////////////////////////////////////////////////////

<canvas width="300" height="200"> </canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");
  var img = document.createElement("img");
  img.src = "img/hat.png";
  img.addEventListener("load",function(){
    for(var x = 10; x < 200; x += 30)
      cx.drawImage(img,x,10);
  });
</script>

////////////////////////////////////////////////////////////////////////////////

<canvas width="300" height="200"> </canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");
  var img = document.createElement("img");
  img.src = "img/player.png";
  var spriteW = 24;
  var spriteH = 30;
  img.addEventListener("load",function(){
    var cycle = 0;
    setInterval(function(){
      cx.clearRect(0,0,spriteW,spriteH);
      cx.drawImage(img,cycle*spriteW,0,spriteW,spriteH,0,0,spriteW,spriteH);
      cycle = (cycle+1) % 8;
    },120);
  });
</script>

<canvas width="300" height="200"> </canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");
  var img = document.createElement("img");
  img.src = "img/player.png";
  cx.drawImage(img,10,10);
</script>

////////////////////////////////////////////////////////////////////////////////

<canvas> </canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");
  cx.scale(3,0.5);
  cx.beginPath();
  cx.arc(50,50,40,0,7);
  cx.lineWidth = 3;
  cx.stroke();
</script>

////////////////////////////////////////////////////////////////////////////////

<canvas> </canvas>
<script>
  var cx = document.querySelectror("canvas").getContext("2d");
  var img = document.createElement("img");
  img.src = "img/player.png";
  var spriteW = 24;
  var spriteH =30;
  img.addEventListener("load",function(){
    flipHorizontally(cx,100+spriteW/2);
    cx.drawImage(img,0,0,spriteW,spriteH,100,0,spriteW,spriteH);
  });
</script>

////////////////////////////////////////////////////////////////////////////////

<canvas> </canvas>
<script>
  var cx = document.querySelector("canvas").getContext("2d");
  function branch(length,angle,scale){
    cx.fillRect(0,0,1,length);
    if(length < 8){return;}
    cx.save();
    cx.translate(0,length);
    cx.rotate(-angle);
    branch(length*scale,angle,scale);
    cx.rotate(2*angle);
    branch(length/scale,angle,scale);
    cx.restore();
  }
  cx.translate(300,0);
  branch(30,0.5,0.8);
</script>

////////////////////////////////////////////////////////////////////////////////


function CanvasDisplay(parent,level){
  this.canvas = document.createElement("canvas");
  this.canvas.width = Math.min(600,level.width*scale);
  this.canvas.height = Math.min(450,level.height*scale);
  parent.appendChild(this.canvas);
  this.cx = this.canvas.getContext("2d");
  this.level = level;
  this.animationTime = 0;
  this.flipPlayer = false;
  this.viewport = {
    left: 0,
    top: 0,
    width: this.canvas.width / scale,
    height: this.canvas.height / scale
  };
  this.drawFrame(0);
}
CanvasDisplay.prototype.clear = function(){
  this.canvas.parentNode().removeChild(this.canvas);
};
CanvasDisplay.prototype.drawFrame = function(){
  this.animationTime += step;
  this.updateViewport();
  this.clearDisplay();
  this.drawBackground();
  this.drawActors();
};
CanvasDisplay.prototype.updateViewport = function(){
  var view = this.viewport;
  var margin = view.width / 3;
  var center = player.pos.plus(player.size.times(0.5));
  if(center.x < view.left + margin){view.left = Math.max(center.x-margin,0);}
  else if(center.x > view.left + view.width - margin){view.left = Math.min(center.x+margin - view.width, this.level.width-view.width);}
  if(center.y < view.top + margin) {view.top = Math.max(center.y-margin,0);}
  else if(center.y > view.top + view.height - margin) {view.top = Math.min(center.y+margin - view.height, this.level.height - view.height);}
};
CanvasDisplay.prototype.clearDisplay = function() {
  if(this.level.status == "won") {this.cx.fillStyle = "rgb(68,191,255)";}
  else if(this.level.status == "lost") {this.cx.fillStyle = "rgb(44,136,214)";}
  else {this.cx.fillStyle = "rgb(52,166,251)";}
  this.cx.fillRect(0,0,this.canvas.width,this.canvas.height);
};
Var otherSprites = document.createElement("img");
otherSprites.src = "img/sprites.png";
CanvasDisplay.prototype.drawBackground = function(){
  var view = this.viewport;
  var xStart = Math.floor(view.left);
  var xEnd = Math.ceil(view.left + view.width);
  var yStart = Math.floor(view.top);
  var yEnd = Math.ceil(view.top + view.height);
  for(var y = yStart; y < yEnd; y++){
    for(var x = xStart; x = xEnd; x++){
      var tile = this.level.grid[y][x];
      if(tile == null) {continue;}
      var screenX = (x - view.left) * scale;
      var screenY = (y - view.top) * scale;
      var tileX = tile == "lava" ? scale : 0;
      this.cx.drawImage(otherSprites,tileX,0,scale,scale,screenX,screenY,scale,scale);
    }
  }
};
var playerSprites = document.createElement("img");
playerSprites.src = "img/player.png";
var playerXOverlap = 4;
CanvasDisplay.prototype.drawPlayer = function(){
  var sprite = 8;
  player = this.level.player;
  x -= playerXOverlap;
  if(player.speed.x != 0) {this.flipPlayer = player.speed.x < 0;}
  if(player.speed.y != 0) {sprite=9;}
  else if(player.speed.x != 0) {sprite = Math.floor(this.animationTime*12)%8;}
  this.cx.save();
  if(this.flipPlayer) {flipHorizontally(this.cx, x+width/2);}
  this.cx.drawImage(playerSprites,sprite*width,0,width,height,x,y,width,height);
  this.cx.restore();
};
CanvasDisplay.prototype.drawActors = function(){
  this.level.actors.forEach(function(actor){
    var width = actor.size.x * scale;
    var height = actor.size.y * scale;
    var x = (actor.pos.x - this.viewport.left) * scale;
    var y = (actor.pos.y - this.viewport.top) * scale;
    if(actor.type == "player"){this.drawPlayer(x,y,width,height);}
    else {
      var tileX = (actor.type == "coin" ? 2: 1) * scale;
      this.cx.drawImage(otherSprites,tileX,0,width,height,x,y,width,height);
    }
  },this);
};
