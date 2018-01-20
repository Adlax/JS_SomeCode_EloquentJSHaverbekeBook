////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
<!doctype html>
<html>

  <style>
    table {border-collapse: collapse;}
    td, th  {border: 1px solib black; padding: 3px 8px;}
    th  {text-align:left;}
  </style>

  <head>
  </head>

  <body>
    <script src="code/mountains.js"></script>
    <script src="code/chapter/13_dom.js"></script>
    <script>
      function buildTable(data){
        vat table = document.createElement("table");
        var fields = Object.keys(data[0]);
        var headRow = document.createElement("tr");
        fields.forEach(function(field){
            var headCell = document.createElement("th");
            headCell.textContent = field;
            headRow.appendChild(headCell);
        });
        table.appendChild(headRow);
        data.forEach(function(object){
            var row = document.createElement("tr");
            fields.forEach(function(field){
              var cell = document.createElement("td");
              cell.textContent = object[field];
              if(typeof object[field] == "number") {cell.style.textAlign = "right";}
              row.appendChild(cell);
            });
            table.appendChild(row);
        });
        return table;
      }
      document.body.appendChild(buildTable(MOUNTAINS));
    </script>
  </body>
</html>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
<!doctype html>
<html>
  <head>
  </head>
  <body>
    <script src="code/mountains.js"></script>
    <script src="code/chapter/13_dom.js"></script>
    <h1> A header with a <span> span </span> element </h1>
    <p> a para element with <span> one </span> <span> two </span> span elements </p>
    <script>
      function byTagname(node,tagName){
        var found = [];
        var tagName = tagName.toUpperCase();
        function explore(node){
          for(var i = 0; i < node.childNodes.length; i++){
            var child = node.childNodes[i];
            if(child.nodeType == document.ELEMENT_NODE){
              if(child.nodeName == tagName) {found.push(child);}
              explore(child);
            }
          }
        }
        explore(node);
        return found;
      }
      console.log(byTagname(document.body,"h1").length);
      console.log(byTagname(document.body,"span").length);
      var paras = document.querySelector("p");
      console.log(byTagname(paras,"span").length);

    </script>

  </body>
</html>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
