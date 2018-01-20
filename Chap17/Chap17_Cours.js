<form method="GET" action="example/message.html">
  <p> Name: <input type="text" name="name"> </p>
  <p> Message: <br> <textarea name="message"></textarea> </p>
  <p> <button type="submit">Send</button> </p>
</form>

<script>
  console.log(encodeURIComponent("Hello & Goodbye"));
   console.log(decodeURIComponent("Hello%20%26%20Goodbye"));
</script>

<script>
  var req = new XMLHttpRequest();
  req.open("GET", "example/data.txt", false);
  req.send(null);
  console.log(req.responseText);
</script>

<script>
  var req = new XMLHttpRequest();
  req.open("GET", "example/data.txt", false);
  req.send(null);
  console.log(req.status, req.statusText);
</script>

<script>
  var req = new XMLHttpRequest();
  req.open("GET", "example/data.txt", true);
  req.addEventListener("load", function(){
    console.log("Done", req.status);
  });
  req.send(null);
</script>

<script>
  var req = new XMLHttpRequest();
  req.open("GET", "example/fruit.xml", false);
  req.send(null);
  console.log(req.responseXML.querySelectorAll("fruit").length);
</script>

<script>
  var req = new XMLHttpRequest();
  req.open("GET", "example/fruit.json", false);
  req.send(null);
  console.log(JSON.parse(req.responseText));
</script>

<script>
  function backgroundReadFile(url,callback){
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.addEventListener("load", function(){
      if(req.status < 400) {callback(req.responseText)};
    });
    req.send(null);
  };

  try{
    backgroundReadFile("example/data.txt", function(text){
      if(text != "expected") {throw new Error("That was unexpected");}
    });
  } catch (error) {
    console.log("Hello from the scratch block");
  }
</script>

<script>
  function backgroundReadFile(url,callback){
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.addEventListener("load", function(){
      if(req.status < 400) {callback(req.responseText)};
    });
    req.send(null);
  };

  try{
    backgroundReadFile("example/data.txt", function(text){
      if(text = "This is the content of data.txt") {console.log("Bonne connexion");}
    });
  } catch (error) {
    console.log("Hello from the scratch block");
  }
</script>

<script>
  function getURL(url,callback){
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.addEventListener("load", function(){
      if(req.status < 400) callback(req.responseText);
      else callback(null, new Error("Request failed " + req.statusText));
    });
    req.addEventListener("error",function(){
      callback(null, new Error("Network error"));
    });
    req.send(null);
  };

  getURL("example/nonsense.txt", function(content, error){
    if(error != null) console.log("Failed to fetch nonsense : " + error);
    else console.log("Connexion to nonsense ok : " + content);
  });
</script>

<script>
  function get(url){
    return new Promise(function(succeed, fail){
      var req = new XMLHttpRequest();
      req.open("GET", url, true);
      req.addEventListener("load",function(){
        if(req.status < 400) succeed(req.responseText);
        else fail(new Error("Request failed : " + req.statusText));
      });
      req.addEventListener("error",function(){
        fail(new Error("Network error"));
      });
      req.send(null);
    });
  };

  get("example/data.txt").then(function(text){
    console.log("data.txt est : " + text);
  }, function(error){
    console.log("Failed to fetch data.txt : " + error);
  });
</script>

<script>
  function get(url){
    return new Promise(function(succeed, fail){
      var req = new XMLHttpRequest();
      req.open("GET", url, true);
      req.addEventListener("load",function(){
        if(req.status < 400) succeed(req.responseText);
        else fail(new Error("Request failed : " + req.statusText));
      });
      req.addEventListener("error",function(){
        fail(new Error("Network error"));
      });
      req.send(null);
    });
  };

  function getJSON(url){
    return get(url).then(JSON.parse);
  };

  function showMessage(msg){
    var elt = document.createElement("div");
    elt.textContent = msg;
    return document.body.appendChild(elt);
  };
  var loading = showMessage("Loading...");
  getJSON("example/bert.json").then(function(bert){
    return getJSON(bert.spouse);
  }).then(function(spouse){
    return getJSON(spouse.mother);
  }).then(function(mother){
    showMessage("The name is : " + mother.name);
  }).catch(function(error){
    showMessage(String(error));
  }).then(function(){
    document.body.removeChild(loading);
  });
</script>
