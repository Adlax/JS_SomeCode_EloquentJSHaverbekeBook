<!doctype html>
<html>

  <head>
  </head>

  <body>
    <p> Ex 1 </p>
    <input type="text">
    <script>
      var field = document.querySelector("input");
      field.addEventListener("keydown",function(event){
        if(event.keyCode == "Q".charCodeAt(0) || event.keyCode == "W".charCodeAt(0) || event.keyCode == "X".charCodeAt(0)){
          event.preventDefault();
        };
      });
    </script>
  </body>

</html>
///////////////////////////////////////////////////////////////////////////
<!doctype html>
<html>

  <head>
  </head>

<style>
  .trail { /* className for the trail elements */
    position: absolute;
    height: 6px; width: 6px;
    border-radius: 3px;
    background: teal;
  }
  body {
    height: 300px;
  }
</style>

  <body>
    <p> Ex 2 </p>
    <script>
      var dots = [];
      for(var i = 0;i <12; i++){
        var node = document.createElement("div");
        node.className = "trail";
        document.body.appendChild(node);
        dots.push(node);
      }
      var currentDot = 0;
      addEventListener("mousemove",function(event){
        var dot = dots[currentDot];
        dot.style.left = (event.pageX - 3) + "px";
        dot.style.top = (event.pageY - 3) + "px";
        currentDot = (currentDot + 1) % dots.length;
      });
    </script>
  </body>

</html>
///////////////////////////////////////////////////////////////////////////////////////////
<!doctype html>
<html>

  <head>
  </head>

  <style>
    body {
      height: 300px;
    }
  </style>

  <body>
    <p> Ex 3 </p>
    <div id="wrapper">
      <div data-tabname="one">Tab One</div>
      <div data-tabname="two">Tab Two</div>
      <div data-tabname="three">Tab Three</div>
    </div>

    <script>
    function asTabs(node){
      var tabs = [];
      for(var i = 0; i < node.childNodes.length; i++){
        var child = node.childNodes[i];
        if(child.nodeType == document.ELEMENT_NODE){tabs.push(child);}
      }
      var tabList = document.createElement("div");
      tabs.forEach(function(tab,i){
        var button = document.createElement("button");
        button.textContent = tab.getAttribute("data-tabname");
        button.addEventListener("click",function(){selectTab(i);});
        tabList.appendChild(button);
      });
      node.insertBefore(tabList,node.firstChild);
      function selectTab(n){
        tabs.forEach(function(tab,i){
          if(i == n) tab.style.display="";
          else tab.style.display="none";
        });
        for(var i = 0; i < tabList.childNodes.length; i++){
          if(i == n) tabList.childNodes[i].style.background="violet";
          else tabList.childNodes[i].style.background="";
        };
      }
      selectTab(0);
    }
    asTabs(document.querySelector("#wrapper"));
    </script>
  </body>

</html>
