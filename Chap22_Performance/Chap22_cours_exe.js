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

function treeGraph(depth,branches){
  var graph = [];
  function buildNode(depth){
    var node = new GraphNode();
    graph.push(node);
    if(depth > 1){
      for(var i = 0; i < branches; i++) node.connect(buildNode(depth-1));
      return node;
    }
  }
  buildNode(depth);
  return graph;
}

var springLength = 40;
var springStrength = 0.1;
var repulsionStrength = 1500;

function forceDirected_simple(graph){
  graph.forEach(function(node){
    graph.forEach(function(other){
      if(other == node) return;
      var apart = other.pos.minus(node.pos);
      var distance = Math.max(1,apart.length);
      var forceSize = - repulsionStrength / (distance*distance);
      if(other.hasEdge(node)) forceSize += springStrength * (distance-springLength);
      var normalized = apart.times(1/distance);
      node.pos = node.pos.plus(normalized.times(forceSize));
    });
  });
}

function forceDirected_forloop(graph){
  for(var i = 0; i < graph.length; i++){
    var node = graph[i];
    for(var j = 0; j < graph.length; j++){
      if(i=j) continue;
      var other = graph[j];
      var apart = other.pos.minus(node.pos);
      var distance = Math.max(1,apart.length);
      var forceSize = - repulsionStrength / (distance*distance);
      if(other.hasEdge(node)) forceSize += (distance - springLength) * springStrength;
      var normalized = apart.times(1/distance);
      node.pos = node.pos.plus(normalized.times(forceSize));
    }
  }
}

function runLayout(implementation,graph){
  var totalSteps = 0;
  var time = 0;
  function step(){
    var startTime = Date.now();
    for(var i = 0; i < 100; i++){
      implementation(graph);
    }
    totalSteps += 100;
    time += Date.now() - startTime;
    drawGraph(graph);
    if(totalSteps < 1000) requestAnimationFrame(step);
    else console.log(time)
  }
  step();
}

var nodeSize = 8;

function drawGraph(graph) {
  var canvas = document.querySelector("canvas");
  if (!canvas) {
    canvas = document.body.appendChild(document.createElement("canvas"));
    canvas.width = canvas.height = 500;
  }
  var cx = canvas.getContext("2d");
  cx.clearRect(0, 0, canvas.width, canvas.height);
  var scale = new Scale(graph, canvas.width, canvas.height);
  // Draw the edges.
  cx.strokeStyle = "orange";
  cx.lineWidth = 3;
  graph.forEach(function(origin, i) {
    origin.edges.forEach(function(target) {
      if (graph.indexOf(target) <= i) return;
      cx.beginPath();
      cx.moveTo(scale.x(origin.pos.x), scale.y(origin.pos.y));
      cx.lineTo(scale.x(target.pos.x), scale.y(target.pos.y));
      cx.stroke();
    });
  });
  // Draw the nodes.
  cx.fillStyle = "purple";
  graph.forEach(function(node) {
    cx.beginPath();
    cx.arc(scale.x(node.pos.x), scale.y(node.pos.y), nodeSize, 0, 7);
    cx.fill();
  });
}

function Scale(graph, width, height) {
  var xs = graph.map(function(node) { return node.pos.x });
  var ys = graph.map(function(node) { return node.pos.y });
  var minX = Math.min.apply(null, xs);
  var minY = Math.min.apply(null, ys);
  var maxX = Math.max.apply(null, xs);
  var maxY = Math.max.apply(null, ys);

  this.offsetX = minX; this.offsetY = minY;
  this.scaleX = (width - 2 * nodeSize) / (maxX - minX);
  this.scaleY = (height - 2 * nodeSize) / (maxY - minY);
}

Scale.prototype.x = function(x) {
  return this.scaleX * (x - this.offsetX) + nodeSize;
};
Scale.prototype.y = function(y) {
  return this.scaleY * (y - this.offsetY) + nodeSize;
};

<script>
  runLayout(forceDirected_forloop,treeGraph(4,4));
</script>
