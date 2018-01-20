///////////////////////////////////////////////MOVING THROUGH THE DOM TREE////////////////////////////////////////////////////////////
<!doctype html>
<html>

  <head>
  </head>

  <body>
    <script>
      function talksAbout(node,string){
        if(node.nodeType == document.ELEMENT_NODE){
          for(var i=0;i<node.childNodes.length;i++){
            if(talksAbout(node.childNodes[i],string)) return true;
          }
          return false;
        }else if(node.nodeType == document.TEXT_NODE){
          return node.nodeValue.indexOf(string) > -1;
        }
      }

      console.log(talksAbout(document.body,"book"));
    </script>
  </body>

</html>

///////////////////////////////////////////////////FINDING SPEC ELEMENT/////////////////////////////////////////////////////////////
<!doctype html>
<html>

  <head>
  </head>

  <body>
    <a href="viol.com">Prout</a>
    <script>
      var link = document.body.getElementByTagName("a")[0];
      console.log(link.href);
    </script>
  </body>

</html>

///////////////////////
<!doctype html>
<html>

  <head>
  </head>

  <body>
    <p> My osrich Gertrude; </p>
	<p> <img id="gertrude" src="img/ostrich.png"> </p>>
    <script>
      var ostrich = document.getElementByTagId("gertrude");
      console.log(ostrich.src);
    </script>
  </body>

</html>


/////////////////////////////////////////////////CHANGING THE DOCUMENT////////////////////////////////////////////////////////////
<!doctype html>
<html>

  <head>
  </head>

  <body>
    <p> One </p>
    <p> Two </p>
    <p> Three </p>
  <script>
    var paragraphs = document.body.getElementByTagName("p");
    document.body.insertBefore(paragraphs[2],paragraphs[0]);
  </script>
  </body>

</html>


////////////////////////////////////////////////////Creating Nodes//////////////////////////////////////////////////////////////////
<!doctype html>
<html>

  <head>
  </head>

  <body>
      <p> The <img src="img/cat.png" alt="Cat"> in the <img src="img/hat.png" alt="Hat"> </p>
      <p> <button onclick="replaceImages()"> Replace </button> </p>
      <script>
        function replaceImages(){
          var images = document.body.getElementByTagName("img");
          for(var i=images.length-1;i>=0;i--){
            var image = images[i];
            if(image.alt){
              var text = document.body.createTextNode(image.alt);
              image.parentNode.replaceChild(text,image);
            }
          }
        }
      </script>
  </body>

</html>

////////////////////////////
var arrayish = {0: "one",1: "two",length: 2};
var real = Array.prototype.slice.call(arrayish,0);
real.forEach(function(elt){console.log(elt);});

/////////////////////////
<blockquote id="quote">
  I fuck Karl Popper
</blockquote>

<!doctype html>
<script src="code/mountains.js"></script>
<script src="code/chapter/13_dom.js"></script>
<html>

  <head>
    <blockquote id="quote">
 	 I fuck Karl Popper
	</blockquote>
  </head>

  <body>
      <script>
            function elt(type){
              var node = document.createElement(type);
              for(var i=1;i<arguments.length;i++){
                var child = arguments[i];
                if(typeOf child == "string"){
                  child == document.createTextNode(child);
                  node.appendChild(child);
                }
                return node;
              }
            }
      		document.getElementByTagId("quote").appendChild(elt("footer","--",elt("strong","Karl Popper")));
    	</script>
  </body>

</html>


/////////////////////////////////////////////////////QUERY SELECTOR///////////////////////////////////////////////////////////
<!doctype html>
<script src="code/mountains.js"></script>
<script src="code/chapter/13_dom.js"></script>
<html>

  <head>
  </head>

  <body>
    <p> And chase <span class="animal"> rabbits </span> </p>
    <p> and fall </p>
    <p> tell em a <span class="character"> hookah <span class="animal"> bee </span> </span> </p>
    <p> Has given </p>

    <script>
      function count(Selector){
        return document.querySelectorAll(selector).length;
      }
    </script>
  </body>

</html>


/////////////////////////////////////////////////////////Attributes//////////////////////////////////////////////////////////////
<!doctype html>
<script src="code/mountains.js"></script>
<script src="code/chapter/13_dom.js"></script>
<html>

  <head>
  </head>

  <body>
      <p data-classified="secret"> The launch code is 4589 </p>
      <p data-classified="unclqssified"> I have 1 foot </p>
      <script>
          var paras = document.body.getElementByTagName("p");
          Array.prototype.forEach.call(paras,function(para){
            if(para.getAttribute("data-classified") == "secret") {para.parentNode.removeChild(para);}
          });
      </script>
  </body>

</html>

//////////////////////////
<!doctype html>
<script src="code/mountains.js"></script>
<script src="code/chapter/13_dom.js"></script>
<html>

  <head>
  </head>

  <body>
      <p> Pouet function; </p>
      <pre data-language="javascript"> function id(x) {return x;} </pre>
      <script>
          function highlightCode(node,keywords){
            var text = node.textContent;
            node.textContent = "";
            var match,pos = 0;
            while(match = keywords.exec(text)){
              var before = text.slice(pos,match.index);
              node.appendChild(document.createTextNode(before));
              var strong = document.createElement("strong");
              strong.appendChild(document.createTextNode(match[0]));
              node.appendChild(strong);
              pos = keywords.lastIndex;
            }
            var after = text.slice(pos);
            node.appendChild(document.createTextNode(after));
          }

          var languages = { javascript: /\b(function|return|var)\b/g};

          function highlightAllCode(){
            var pres = document.body.getElementByTagName("pre");
            for(var i = 0;i<pres.length;i++){
              var pre = pres[i];
              var lang = pre.getAttribute("data-language");
              if(languages.hasOwnProperty(lang)) {hightlightCode(pre,languages[lang]);}
            }
          }

          highlightAllCode();
      </script>
  </body>

</html>

///////////////////////////////////////////////////////Layout///////////////////////////////////////////////////////////////
<!doctype html>
<script src="code/mountains.js"></script>
<script src="code/chapter/13_dom.js"></script>
<html>

  <head>
  </head>

  <body>
  	<p style="border: 3px solid red"> I am boxed </p>
     <script>
        var para = document.body.getElementByTagName("p");
  		console.log("clientHeight; ",para.clientHeight);
  		console.log("offsetHeight; ",para.offsetHeight);
     </script>
  </body>

</html>

////////////////////////////////////////////////////////Styling//////////////////////////////////////////////////////////////////
<!doctype html>
<script src="code/mountains.js"></script>
<script src="code/chapter/13_dom.js"></script>
<html>

  <head>
  </head>

  <body>
    <p> <a href=".">Normal link</a> </p>
    <p> <a href="." style="color: green">Green link</a> </p>
    This text is displayed <strong> inline! </strong>
    <strong style="display: block">as a block</strong> and
    <strong style="display: none">not at all</strong>
	<p id="para" style="color: purple"> Pretty text </p>
    <script>
        var para = document.getElementByTagId("para");
        console.log(para.style.color);
        para.style.color = "magenta";
     </script>
  </body>

</html>


/////////////////////////////////////////////////Cascading css style sheet/////////////////////////////////////////////////////
<style>
  strong {
    font-style: italic;
    color: gray;
  }
</style>
<p> Now <strong> strong text </strong> is italic and grayed </p>
