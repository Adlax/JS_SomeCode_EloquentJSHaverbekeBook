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
