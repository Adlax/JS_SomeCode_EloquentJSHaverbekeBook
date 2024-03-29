<p> <input type="text" value="abc"> (text) </p>
<p> <input type="password" value ="abc"> (password) </p>
<p> <input type="checkbox" checked> (checkbox) </p>
<p> <input type="radio" value="A" name="choice">
    <input type="radio" value="B" name="choice">
    <input type="radio" value="C" name="choice" checked> (radio) </p>
<p> <input type="file"> (file) </p>

////////////////////////////////////////////////////////////////////////////////

<textarea>
  one
  two
  three
</textarea>

////////////////////////////////////////////////////////////////////////////////

<select>
  <option> Pancakes </option>
  <option> Pudding </option>
  <option> Ice Cream </option>
</select>

////////////////////////////////////////////////////////////////////////////////

<input type="text">
<script>
  document.querySelector("input").focus();
  console.log(document.activeElement.tagName);
  document.querySelector("input").blur();
  console.log(document.activeElement.tagName);
</script>

////////////////////////////////////////////////////////////////////////////////

<input type="text" autofocus>

////////////////////////////////////////////////////////////////////////////////

<input type="text" tabindex=1> <a href=".">heelp!</a>
<button onclick="console.log('ok')" tabindex=2> OK </button>

////////////////////////////////////////////////////////////////////////////////

<button> I m all right now I m dead </button>
<button disabled> I m out </button>

////////////////////////////////////////////////////////////////////////////////

<form action="example/submit.html">
  Name : <input type="text" name="name"> <br>
  Pass : <input type="password" name="passwrd"> <br>
  <button type="submit"> LOG IN </button>
</form>
<script>
  var form = document.querySelector("form");
  console.log(form.elements[1].type);
  console.log(form.elements.passwrd.type);
  console.log(form.elements.name.form == form);
</script>

////////////////////////////////////////////////////////////////////////////////

<form action="example/submit.html">
  Value : <input type="text" name="value">
  <button type="submit"> Save </button>
</form>
<script>
  var form = document.querySelector("form");
  form.addEventListener("submit", function(event){
    console.log("Saving Value : ", form.elements.value.value);
    event.preventDefault();
  });
</script>

////////////////////////////////////////////////////////////////////////////////

<textarea> </textarea>
<script>
  var textarea = document.querySelector("textarea");
  textarea.addEventListener("keydown", function(event){
    if(event.keyCode == 113){
      replaceSelection(textarea, "Kharoschewsky");
      event.preventDefault();
    }
  });
  function replaceSelection(field, word){
    var fro = field.selectionStart;
    var to = field.selectionEnd;
    field.value = field.value.slice(0,fro) + word + field.value.slice(to);
    field.selectionStart = field.selectionEnd = fro + word.length;
  };
</script>

////////////////////////////////////////////////////////////////////////////////

<input type="text"> length: <span id="length">0</span>
<script>
  var text = document.querySelector("input");
  var output = document.querySelector("#length");
  text.addEventListener("input", function(){
    output.textContent = text.value.length;
  });
</script>

////////////////////////////////////////////////////////////////////////////////

<input type="checkbox" id="purple">
<label for="purple"> Make this page purple </label>
<script>
  var checkbox = document.querySelector("#purple");
  checkbox.addEventListener("change", function(){
    document.body.style.background = checkbox.checked ? "mediumpurple" : "";
  });
</script>

////////////////////////////////////////////////////////////////////////////////

Color :
<input type="radio" name="color" value="mediumpurple"> purple
<input type="radio" name="color" value="lightgreen"> Green
<input type="radio" name="color" value="lightblue"> Blue
<script>
  var buttons = document.getElementsByName("color");
  function setColor(event){
    document.body.style.background = event.target.value;
  }
  for(var i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("change", setColor);
  }
</script>

////////////////////////////////////////////////////////////////////////////////

<select multiple>
  <option> Pan </option>
  <option> Puk </option>
  <option> Zob </option>
</select>

////////////////////////////////////////////////////////////////////////////////

<select multiple>
  <option value="1">0001</option>
  <option value="2">0010</option>
  <option value="4">0100</option>
  <option value="8">1000</option>
</select> = <span id="output">0</span>
<script>
  var select = document.querySelector("select")
  var output = document.querySelector("#output");
  select.addEventListener("change", function(){
    var number = 0;
    for(var i = 0; i < select.options.length; i++){
      var option = select.options[i];
      if(option.selected) number += Number(option.value);
    }
    output.textContent = number;
  });
</script>

////////////////////////////////////////////////////////////////////////////////

<input type="file">
<script>
  var input = document.querySelector("input");
  input.addEventListener("change", function(){
    if(input.files.length > 0){
      var file = input.files[0];
      console.log("You chose", file.name);
      if(file.type) console.log("With type : ", file.type);
    }
  });
</script>

////////////////////////////////////////////////////////////////////////////////

<input type="file" multiple>
<script>
  var input = document.querySelector("input");
  input.addEventListener("change", function(){
    Array.prototype.forEach.call(input.files, function(file){
      var reader = new FileReader();
      reader.addEventListener("load",function(){
        console.log("File", file.name, "starts with", reader.result.slice(0,20));
      });
      reader.readAsText(file);
    });
  });
</script>

////////////////////////////////////////////////////////////////////////////////

function readFile(file){
  return new Promise(function(success,fail){
    var reader = new FileReader();
    reader.addEventListener("load", function(){
      success(reader.result);
    });
    reader.addEventListener("error", function(){
      fail(reader.result);
    });
    reader.readAsText(file);
  });
}

////////////////////////////////////////////////////////////////////////////////

localStorage.setItem("username", "bob");
console.log(localStorage.getItem("username"));
localStorage.removeItem("username");

////////////////////////////////////////////////////////////////////////////////

Notes : <select id="list"> </select>
<button onclick="addNote()"> New </button>
<textarea id="currentnote" style="width: 100%; height: 10em;"> </textarea>

<script>
  var list = document.querySelector("#list");
  function addToList(name){
    var option = document.createElement("option");
    option.textContent = name;
    list.appendChild(option);
  }
  var notes = JSON.parse(localStorage.getItem("notes")) || {"shopping": ""};
  for(var name in notes){
    if(notes.hasOwnProperty(name)) addToList(name);
  }
  function saveToStorage(){
    localStorage.setItem("notes", JSON.stringify(notes));
  }
  var current = document.querySelector("#currentnote");
  current.value = notes[list.value];
  list.addEventListener("change",function(){
    current.value = notes[list.value];
  })
  current.addEventListener("change",function(){
    notes[list.value] = current.value;
    saveToStorage();
  });
  function addNote(){
    var name = prompt("Note name : ","");
    if(!name) return;
    if(!notes.hasOwnProperty(name)){
      notes[name] = "";
      addToList(name);
      saveToStorage();
    }
    list.value = name;
    current.value = notes[name];
  }
</script>
