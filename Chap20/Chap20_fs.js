var fs = require("fs");
fs.readFile("graf.txt","utf8",function(error,text){
  if(error) throw error;
  console.log(text);
});
