function forAllNeighbors(point, fn){
  fn({x: point.x, y: point.y - 1});
  fn({x: point.x, y: point.y + 1});
  fn({x: point.x - 1, y: point.y});
  fn({x: point.x + 1, y: point.y});
}

function isTheSameColor(data, point1, point2){
  var offset1 = (point1.x + point1.y*data.width) * 4;
  var offset2 = (point2.x + point2.y*data.width) * 4;
  for(var i = 0; i < 4; i++){
    if (data.data[offset1 + i] != data.data[offset2 + i]) return false;
  }
  return true;
}

tools.floodFill = function(event, cx){
  var startPos = relativePos(event, cx.canvas);
  var data = cx.getImageData(0,0,cx.canvas.width,cx.canvas.height);
  var alreadyFilled = Array(cx.canvas.width * cx.canvas.height);
  var workList =[startPos];
  while(workList.length){
    var pos = workList.pop();
    var offset = pos.x + pos.y * data.width;
    if(alreadyFilled[offset]) continue;
    cx.fillRect(pos.x,pos.y,1,1);
    alreadyFilled[offset] = true;
    forAllNeighbors(pos,function(neighbor){
      if( neighbor.x >= 0 && neighbor.x < data.width && neighbor.y >= 0 && neighbor.y < data.height && isTheSameColor(data,startPos,neighbor)){
        workList.push(neighbor);
      }
    });
  }
};
