//Vector
function Vector(x,y){
  this.x = x;
  this.y = y;
}
Vector.prototype.plus = function(other){
  return new Vector(this.x + other.x,this.y + other.y);
};
Vector.prototype.minus = function(other){
  return new Vector(this.x - other.x,this.y - other.y);
};
Vector.prototype.times = function(scal){
  return new Vector(this.x * scal, this.y * scal);
};
Object.defineProperty(Vector.prototype,"length", { get : function(){return Math.sqrt(this.x*this.x+this.y*this.y);} });
