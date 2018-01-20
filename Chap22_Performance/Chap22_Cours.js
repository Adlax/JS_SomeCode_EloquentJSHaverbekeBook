//Vector///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

//Node////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

//Graph////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

//forceDirected_simple/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

//forceDirected_forloop/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

//forceDirected_norepeat/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function forceDirected_norepeat(graph){
  for(var i = 0; i < graph.length; i++){
    var node = graph[i];
    for(var j = i+1; j < graph.length; j++){
      var other = graph[j];
      var apart = other.pos.minus(node.pos);
      var distance = Math.max(1,apart.length);
      var forceSize = - repulsionStrength / (distance*distance);
      if(other.hasEdge(node)) forceSize += (distance-springLength)*springStrength;
      var applied = apart.times(forceSize/distance);
      node.pos = node.pos.plus(applied);
      other.pos = other.pos.minus(applied);
    }
  }
}

//forceDirected_novector/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function forceDirected_novector(graph){
  for(var i =0; i < graph.length; i++){
    var node = graph[i];
    for(var j = 0; j < graph.length; j++){
      var other = graph[j];
      var apartX = other.pos.x - node.pos.x;
      var apartY = other.pos.y - node.pos.y;
      var distance = Math.max(1, Math.sqrt(apartX*apartX + apartY*apartY));
      var forceSize = - repulsionStrength / (distance*distance);
      if(other.hasEdge(node)) forceSize += (distance-springLength) * springStrength;
      var forceX = apartX * forceSize / distance;
      var forceY = apartY * forceSize / distance;
      node.pos.x += forceX;
      node.pos.y += forceY;
      other.pos.x -= forceX;
      other.pos.y -= forceY;
    }
  }
}

//forceDirected_localforce/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function forceDirected_localforce(graph){
  var forcesX = [];
  var forcesY = [];
  for(var i = 0; i < graph.length; i++){
    forcesX[i] = forcesY[i] = 0;
  }
  for(var i = 0; i < graph.length; i++){
    var node = graph[i];
    for(var j = i+1; j < graph.length; j++){
      var other = graph[j];
      var apartX = other.pos.x - node.pos.x;
      var apartY = other.pos.y - node.pos.y;
      var distance = Math.max(1,Math.sqrt(apartX*apartX + apartY*apartY));
      var forceSize = -repulsionStrength / (distance*distance);
      if(other.hasEdge(node)) forceSize += (distance-springLength) * springStrength;
      var forceX = apartX * forceSize / distance;
      var forcesY = apartY * forceSize / distance;
      forcesX[i] += forceX;
      forcesY[i] += forceY;
      forcesX[j] -= forceX;
      forcesY[j] -= forceY;
    }
  }
  for(var i = 0; i < graph.length; i++){
    graph[i].pos.x += forcesX[i];
    graph[i].pos.y += forcesY[i];
  }
}

//runLayout///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

//draw graph///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Since we will want to inspect the layouts our code produces, let's
// first write code to draw a graph onto a canvas. Since we don't know
// in advance how big the graph is, the `Scale` object computes a
// scale and offset so that all nodes fit onto the given canvas.

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

// The function starts by drawing the edges, so that they appear
// behind the nodes. Since the nodes on _both_ side of an edge refer
// to each other, and we don't want to draw every edge twice, edges
// are only drawn then the target comes _after_ the current node in
// the `graph` array.

// When the edges have been drawn, the nodes are drawn on top of them
// as purple discs. Remember that the last argument to `arc` gives the
// rotation, and we have to pass something bigger than 2π to get a
// full circle.

// Finding a scale at which to draw the graph is done by finding the
// top left and bottom right corners of the area taken up by the
// nodes. The offset at which nodes are drawn is based on the top left
// corner, and the scale is based on the size of the canvas divided by
// the distance between those corners. The function reserves space
// along the sides of the canvas based on the `nodeSize` variable, so
// that the circles drawn around nodes’ center points don't get cut off.

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

// The `x` and `y` methods of the `Scale` type convert from graph
// coordinates into canvas coordinates.

//findPath/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function findPath(a,b){
  work = [[a]];
  for(var i = 0; i < work.length; i++){
    var cur = work[i];
    var end = cur[cur.length-1];
    if(end==b) return cur;
    end.edges.forEach(function(next){
      if(!work.some(function(work){return work[work.length-1]==next;})) work.push(cur.concat([next]));
    });
  }
}

//findPath_ids/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function withIDs(graph){
  for(var i = 0; i<graph.length; i++){
    graph[i].id = i;
  }
  return graph;
}

function findPath_ids(a,b){
  work = [[a]];
  var seen = Object.create(null);
  for(var i = 0; i < work.length; i++){
    var cur = work[i];
    var end = work[work.length-1];
    if(end==b) return cur;
    end.edges.forEach(function(next){
      if(!seen[next.id]){
        seen[next.id]=true;
        work.push(cur.concat([next]));
      }
    });
  }
}

//findPath_list/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function listToArray(list){
  var result = [];
  for(var cur = list; cur; cur; cur = cur.via) result.unshift(cur.last);
  return result;
}

function findPath_list(a,b){
  var work = [{last : a, via : null}];
  var seen = Object.create(null);
  for(var i = 0; i < work.length; i++){
    var cur = work[i];
    if(cur.last==b) return listToArray(cur);
    cur.last.edges.forEach(function(next){
      if(!seen[next.id]){
        seen[next.id]=true;
        work.push({last : next, via : cur});
      }
    });
  }
}

//script///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
<script>
  runLayout(forceDirected_simple,treeGraph(4,4));
</script>

//scripts exos 1 et 2////////////////////////////////////////////////
var graph = treeGraph(4,4);
var root = graph[0];
var leaf = graph[graph.length-1];
var startTime = Date.now();
console.log(findPath(root,leaf).length);
console.log("Time taken ;",Date.now() - startTime);

root.connect(leaf);
console.log(findPath(root.leaf).length);

//scripts exo 3////////////////////////////////////////////////
graph = treeGraph(8,5);
start = graph[0];
end = graph[graph.length-1];
withIDs(graph);
startTime = Date.now();
console.log(findPath_ids(start,end).length);
console.log("Time taken from start to end with pathIDs ; ", Date.now()-startTime);
