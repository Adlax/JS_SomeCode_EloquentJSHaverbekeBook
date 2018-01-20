function colorAt(cx,x,y){
  var pixel = cx.getImageData(x,y,1,1).data;
  return "rgb(" + pixel[0] + "," + pixel[1] + "," + pixel[2] + ")";
}

tools.colorPicker = function(event,cx){
  var pos = relativePos(event,cx.canvas);
  try{
    var color = colorAt(cx,pos.x,pos.y);
  } catch(error){
    if(error instanceof SecurityError){
      alert('Unable to acces the color');
      return;
    } else {
      throw error;
    }
  }
  cx.fillStyle = color;
  cx.strokeStyle = color;
}
