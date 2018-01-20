function rectangleFrom(a,b){
  return {left: Math.min(a.x,b.x),
          top: Math.min(a.y,b.y),
          width: Math.abs(a.x-b.x),
          height:Math.abs(a.y,b.y)};
}

tools.Rectangle = function(event,cx){
  var relativeStart = relativePos(event,cx.canvas);
  var pageStart = {x: event.pageX, y: event.pageY};
  var trackingNode = document.createElement("div");
  trackingNode.style.position = "absolute";
  trackingNode.style.background = cx.fillStyle;
  document.body.appendChild(trackingNode);
  trackDrag(function(event){
    var rect = rectangleFrom(pageStart,{x: event.pageX,y: event.pageY});
    trackingNode.style.left = rect.left + "px";
    trackingNode.style.top = rect.top + "px";
    trackingNode.style.width = rect.width + "px";
    trackingNode.style.height = rect.height + "px";
  },function(event){
    var rect = rectangleFrom(pageStart,{x: event.pageX, y: event.pageY});
    cx.fillRect(rect.left, rect.top, rect.left+rect.width, rect+top+rect.height);
    document.body.removeChild(trackingNode);
  });
}
