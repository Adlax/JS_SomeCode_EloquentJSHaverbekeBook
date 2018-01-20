<!DOCTYPE html>
<textarea id="code"> Type your code here </textarea>
<button> Run code </button>
<pre id="output"> </pre>
<script>
  var button = document.querySelector("button");
  button.addEventListener("click", function(){
    var code = document.querySelector("#code").value;
    var outputNode = document.querySelector("#output");
    try{
      var result = new Function(code)();
      outputNode.innerText = String(result);
    } catch(error){
      outputNode.innerText = String("error : " + error);
    }
  });
</script>

////////////////////////////////////////////////////////////////////////////////

<!DOCTYPE html>
<input type="text" id="field">
<div id="suggestions" style="cursor : pointer;"> </div>

<script>
  var terms = [];
  for(var name in window) terms.push(name);
  var textField = document.querySelector("#field");
  var suggestions = document.querySelector("#suggestions");
  textField.addEventListener("input", function(){
    suggestions.innerText = "";
    var matchings = terms.filter(function(term){
      return term.indexOf(textField.value) == 0;
    });
    matchings.slice(0,20).forEach(function(term){
      var node = document.createElement("div");
      node.textContent = term;
      node.addEventListener("click",function(){
        textField.value = term;
        suggestions.textContent = "";
      });
      suggestions.appendChild(node);
    });
  });
</script>

////////////////////////////////////////////////////////////////////////////////

<!doctype html>
<div id="grid"></div>
<button id="next"> Next turn </button>
<button id="run"> Run continuously </button>
<script>
  var height = 15;
  var width = 30;
  var gridNode = document.querySelector("#grid");
  var checkBoxes = [];
  for(var y = 0; y < height; y++){
    for(var x = 0; x < width; x++){
      var box = document.createElement("input");
      box.type = "checkbox";
      gridNode.appendChild(box);
      checkBoxes.push(box);
    }
    gridNode.appendChild(document.createElement("br"));
  }
  function gridFromCheckboxes() {
    return checkBoxes.map(function(box) { return box.checked; });
  }
  function checkboxesFromGrid(grid) {
    return grid.forEach(function(value, i) { checkBoxes[i].checked = value; });
  }
  function randomGrid() {
    var result = [];
    for (var i = 0; i < height * width; i++){
      result.push(Math.random() < 0.3);
    }
    return result;
  }
  checkboxesFromGrid(randomGrid());
  function countNeighbors(grid, x, y) {
    var count = 0;
    for (var ys = Math.max(0, y - 1); ys <= Math.min(height - 1, y + 1); ys++) {
      for (var xs = Math.max(0, x - 1); xs <= Math.min(width - 1, x + 1); xs++) {
        if((xs != x || ys != y) && (grid[xs + ys*width])) count += 1;
      }
    }
    return count;
  }
  function nextGeneration(grid) {
    var newGrid = new Array(height * width);
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        var neighbors = countNeighbors(grid, x, y);
        var offset = x + y*width;
        if( neighbors < 2 || neighbors > 3) newGrid[offset] = false;
        else if(neighbors == 2) newGrid[offset] = grid[offset];
        else newGrid[offset] = true;
      }
    }
    return newGrid;
  }
  function turn() {
    checkboxesFromGrid(nextGeneration(gridFromCheckboxes()));
  }
  document.querySelector("#next").addEventListener("click", turn);
  var running = null;
  document.querySelector("#run").addEventListener("click",function() {
    if (running) {
      clearInterval(running);
      running = null;
    } else {
      running = setInterval(turn, 400);
    }
  });
</script>
