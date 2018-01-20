var types = ["text/plain","text/html","application/json","application/rainbows+unicorns"];

function requestAuthor(type){
  var req = new XMLHttpRequest();
  req.open("GET", "http://eloquentjavascript.net/author", false);
  req.setRequestHeader("accept", type);
  req.send(null);
  return req.responseText;
}

types.forEach(function(type){
  try{
    var rep = requestAuthor(type);
    console.log(type + ":\n" + rep + "\n");
  } catch (error) {
    console.log("Failed" + error);
  }
});

////////////////////////////////////////////////////////////////////////////////
