<!doctype html>
<script>
function elt(name,attributes) {
  var node = document.createElement(name);
  if(attributes){
    for(var attr in attributes){
      if(attributes.hasOwnProperty(attr)){
        node.setAttribute(attr,attributes[attr]);
      }
    }
  }
  for(var i = 2; i < arguments.length; i++){
    var nodechild = arguments[i];
    if(typeof nodechild == "string") {nodechild = document.createTextNode(nodechild);}
    node.appendChild(nodechild);
  }
  return node;
}

var controls = Object.create(null);

function createPaint(parent) {
  var canvas = elt("canvas",{width: 500, height: 300});
  var cx = canvas.getContext("2d");
  var toolbar = elt("div",{class: "toolbar"});
  for(var control in controls) toolbar.appendChild(controls[control](cx));
  var panel = elt("div",{class: "picturepanel"}, canvas);
  parent.appendChild(elt("div", null, panel, toolbar));
}

function relativePos(event,element){
  var rect = element.getBoundingClientRect();
  return {x: Math.floor(event.clientX - rect.left), y: Math.floor(event.clientY - rect.top)};
}

controls.tool = function(cx){
  var select = elt("select");
  for(var tool in tools) select.appendChild(elt("option", null, tool));
  cx.canvas.addEventListener("mousedown",function(event){
    if(event.which == 1){
      tools[select.value](event,cx);
      event.preventDefault();
    }
  });
  return elt("span",null,"Tool: ",select);
};

function trackDrag(onMove,onEnd){
  function end(event){
    removeEventListener("mousemove",onMove);
    removeEventListener("mouseup",end);
    if(onEnd) onEnd(event);
  }
  addEventListener("mousemove", onMove);
  addEventListener("mouseup", end);
}

var tools = Object.create(null);

tools.Line = function(event,cx,onEnd){
  cx.lineCap = "round";
  var pos = relativePos(event,cx.canvas);
  trackDrag(function(event){
    cx.beginPath();
    cx.moveTo(pos.x,pos.y);
    pos = relativePos(event,cx.canvas);
    cx.lineTo(pos.x,pos.y);
    cx.stroke();
  }, onEnd);
};

tools.Erase = function(event,cx){
  cx.globalCompositeOperation = "destination-out";
  tools.Line(event,cx,function(){cx.globalCompositeOperation = "source-over";});
};

controls.color = function(cx){
  var input = elt("input",{type: "color"});
  input.addEventListener("change",function(){
    cx.fillStyle = input.value;
    cx.strokeStyle = input.value;
  });
  return elt("span",null,"Color: ",input);
};

controls.brushSize = function(cx){
  var select = elt("select");
  var sizes = [1,2,3,5,8,12,25,35,50,70,100];
  sizes.forEach(function(size){
    select.appendChild(elt("option",{value: size},size + "pixels"));
  });
  select.addEventListener("change",function(){
    cx.lineWidth = select.value;
  });
  return elt("span",null,"Size: ",select);
};

controls.save = function(cx){
  var link = elt("a",{href: "/"},"Save");
  function update(){
    try{
      link.href = cx.canvas.toDataURL();
    } catch(error) {
      if(error instanceof SecurityError){
        link.href = "javascript:alert(" + JSON.stringify("Cant save " + error.toString()) + ")";
      }
      else {
        throw error;
      }
    }
  }
  link.addEventListener("mouseover",update);
  link.addEventListener("focus",update);
  return link;
};

function loadImageURL(cx,url){
  var image = document.createElement("img");
  image.addEventListener("load",function(){
    var color = cx.fillStyle;
    var size = cx.lineWidth;
    cx.canvas.width = image.width;
    cx.canvas.height = image.height;
    cx.drawImage(image,0,0);
    cx.fillStyle = color;
    cx.lineWidth = size;
  });
  image.src = url;
}

controls.openFile = function(cx){
  var input = elt("input",{type: "file"});
  input.addEventListener("change", function(){
    if(input.files.length == 0) return;
    var reader = new FileReader();
    reader.addEventListener("load",function(){
      loadImageURL(cx,reader.result);
    });
    reader.readAsDataURL(input.files[0]);
  });
  return elt("div",null,"Open a file: ",input);
};

controls.openURL = function(cx){
  var input = elt("input", {type: "text"});
  var form = elt("form", null, "Open URL: ", input, elt("button",{type: "submit"},"Load URL"));
  form.addEventListener("submit",function(event){
    event.preventDefault();
    loadImageURL(cx,form.querySelector("input").value);
  });
  return form;
};

tools.Text = function(event,cx){
  var text = prompt("Votre texte: ","");
  if(text){
    var pos = relativePos(event,cx.canvas);
    cx.font = Math.max(7,cx.lineWidth) + "px sans-serif";
    cx.fillText(text,pos.x,pos.y);
  }
};

tools.Spray = function(event, cx) {
  var radius = cx.lineWidth / 2;
  var area = radius * radius * Math.PI;
  var dotsPerTick = Math.ceil(area / 30);
  var currentPos = relativePos(event, cx.canvas);
  var spray = setInterval(function() {
    for (var i = 0; i < dotsPerTick; i++) {
      var offset = randomPointInRadius(radius);
      cx.fillRect(currentPos.x + offset.x,
                  currentPos.y + offset.y, 1, 1);
    }
  }, 25);
  trackDrag(function(event) {
    currentPos = relativePos(event, cx.canvas);
  }, function() {
    clearInterval(spray);
  });
};

function randomPointInRadius(radius){
  for(;;){
    var x = Math.random()*2 - 1;
    var y = Math.random()*2 - 1;
    if(x*x + y*y <= 1) return {x: x*radius,y: y*radius};
  }
}

function rectangleFrom(a,b){
  return {left: Math.min(a.x,b.x),
          top: Math.min(a.y,b.y),
          width: Math.abs(a.x-b.x),
          height:Math.abs(a.y-b.y)};
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
    var rect = rectangleFrom(relativeStart,relativePos(event,cx.canvas));
    cx.fillRect(rect.left, rect.top, rect.width, rect.height);
    document.body.removeChild(trackingNode);
  });
}

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

</script>

<link rel="stylesheet" href="css/paint.css">

<body>
  <script>createPaint(document.body);</script>
</body>
