////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
<!doctype html>
<html>

  <head>
  </head>

  <body>
    <p> Click this doc to acti the handler </p>
    <script>
      addEventListener("click",function(){
        console.log("You clicked!");
      });
    </script>
  </body>

</html>
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
<!doctype html>
<html>

  <head>
  </head>

  <body>
    <button> Click here </button>
    <p> not here </p>
    <script>
      var button = document.querySelector("button");
      button.addEventListener("click",function(){
        console.log("You clicked the button!");
      });
    </script>
  </body>

</html>
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
<!doctype html>
<html>

  <head>
  </head>

  <body>
    <button> Act-once button </button>
    <p> not here </p>
    <script>
      var button = document.querySelector("button");
      function once(){
        console.log("You clicked the act-once button!");
        button.removeEventListener("click",once);
      }
      button.addEventListener("click",once);
    </script>
  </body>

</html>
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
<!doctype html>
<html>

  <head>
  </head>

  <body>
    <button> Click me any way you want! I like to suffer </button>
    <script>
      var button = document.querySelector("button");
      button.addEventListener("mousedown",function(event){
        if(event.which == 1) console.log("Left button buddy!");
        if(event.which == 2) console.log("Middle finger");
        if(event.which == 3) console.log("Right button buddy!");
      });
    </script>
  </body>

</html>
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
<!doctype html>
<html>

  <head>
  </head>

  <body>
    <p> a para with <button> a button </button> </p>
    <script>
      var para = document.querySelector("p");
      var button = document.querySelector("button");
      para.addEventListener("mousedown",function(){
        console.log("Handler for the paragraph node");
      });
      button.addEventListener("mousedown",function(event){
        console.log("Handler for the button");
        if(event.which == 3) event.stopPropagation();
      });
    </script>
  </body>

</html>
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
<!doctype html>
<html>

  <head>
  </head>

  <body>
    <button> A button </button>
    <button> B button </button>
    <button> C button </button>
    <script>
      document.body.addEventListener("click",function(event){
        if(event.target.nodeName == "BUTTON") console.log("Clicked ; ",event.target.textContent);
      });
    </script>
  </body>

</html>
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
<!doctype html>
<html>

  <head>
  </head>

  <body>
    <a href="https://developer.mozilla.org/"> MDN </a>
    <script>
      var link = document.querySelector("a");
      link.addEventListener("click",function(event){
        console.log("Nope ; no access granted!");
        event.preventDefault();
      });
    </script>
  </body>

</html>
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
<!doctype html>
<html>

  <head>
  </head>

  <body>
    <p> This page turns violet when you hit V key </p>
    <script>
      addEventListener("keydown",function(event){
        if(event.keyCode == 86) document.body.style.background = "violet";
      });
      addEventListener("keyup",function(event){
        if(event.keyCode == 86) document.body.style.background = "";
      });
    </script>
  </body>

</html>
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log("violet".charCodeAt(0));
console.log("1".charCodeAt(0));
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
<!doctype html>
<html>

  <head>
  </head>

  <body>
    <p> Press ctrh-space to continue </p>
    <script>
      addEventListener("keydown",function(event){
        if(event.keyCode == 32 && event.ctrlKey) console.log("Fuck Continue!!");
      });
    </script>
  </body>

</html>
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
<!doctype html>
<html>

  <head>
  </head>

  <body>
    <p> Focus this page and type something </p>
    <script>
      addEventListener("keypress",function(event){
        console.log(event.charCode);
        console.log(String.fromCharCode(event.charCode));
      });
    </script>
  </body>

</html>
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
<!doctype html>
<html>

  <head>
  </head>

  <body>
    <style>
      body{
        height: 200px;
        background: beige;
      }
      .dot{
        height: 8px;
        width: 8px;
        border-radius: 4px;
        background: blue;
        position: absolute;
      }
    </style>
    <script>
      addEventListener("keypress",function(event){
        var dot = document.createElement("div");
        dot.className = "dot";
        dot.style.left = (event.pageX - 4) + "px";
        dot.style.top = (event.pageY - 4) + "px";
        document.body.appendChild(dot);
      });
    </script>
  </body>

</html>
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
<!doctype html>
<html>

  <head>
  </head>

  <body>
    <p> Drag the bar to change its width </p>
    <div style="background: orange; width: 60px; height: 20px;">  </div>
    <script>
      var lastX;
      var rect = document.querySelector("div");
      rect.addEventListener("mousedown",function(event){
        if(event.which == 1){
          lastX = event.pageX;
          addEventListener("mousedown",moved);
          event.preventDefault();
        }
      });
      function buttonPressed(event){
        if(event.buttons == null) return event.which !=0;
        else return event.buttons !=0;
      }
      function moved(event){
        if(!buttonPressed(event)) {removeEventListerner("mousemove",moved);}
        else {
          var dist = event.pageX - lastX;
          var newWidth = Math.max(10,rect.offsetWidth + dist);
          rect.style.width = newWidth + "px";
          lastX = event.pageX;
        }
      }
    </script>
  </body>

</html>
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
<!doctype html>
<html>

  <head>
  </head>

  <body>
    <p> Hover over this <strong>paragraph</strong>. </p>
    <script>
      var para = document.querySelector("p");
      function isInside(node, target){
        for(; node != null;node = node.parentNode)
          if(node == target) return true;
      }
      para.addEventListener("mouseover", function(event){
        if(!isInside(event.relatedTarget,para)) para.style.color = "red";
      });
      para.addEventListener("mouseout", function(event){
        if(!isInside(event.relatedTarget,para)) para.style.color = "";
      });
    </script>
  </body>

</html>
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

<!doctype html>
<html>

  <head>
  </head>

  <body>
    <style>
      p:hover {color: red}
    </style>
    <p> Hover over this <strong>paragraph</strong>. </p>
    <script>
    </script>
  </body>

</html>
