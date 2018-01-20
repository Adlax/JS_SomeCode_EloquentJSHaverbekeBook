var month = function(){
  var names = ["Jan","Fev","Mars","Avr","Mai","Juin","Juill","Aout","Sept","Oct","Nov","Dec"];

  return {
    name: function(number) { return names[number]; },
    number: function(name) { return names.indexOf(name); }
  };
}();

console.log(month.name(2));
console.log(month.number("Jan"));
