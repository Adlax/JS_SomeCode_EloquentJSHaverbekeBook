//Node
function GraphNode(){
  this.pos = new Vector(Math.random()*1000,Math.random()*1000);
  this.edges = [];
};
GraphNode.prototype.connect = function(other){
  this.edges.push(other);
  other.edges.push(this);
};
GraphNode.prototype.hasEdge = function(other){
  for(var i = 0; i < this.edges.length; i++){
    if(this.edges[i] == other) return true;
  }
};
