topEnv["array"] = function(){
  return Array.prototype.slice.call(arguments,0);
};

topEnv["length"] = function(array){
  return array.length;
};

topEnv["element"] = function(array,i){
  return array[i];
};

run("do(define(sum, fun(array,",
    "     do(define(i, 0),",
    "        define(sum, 0),",
    "        while(<(i, length(array)),",
    "          do(define(sum, +(sum, element(array, i))),",
    "             define(i, +(i, 1)))),",
    "        sum))),",
    "   print(sum(array(1, 2, 3))))");


function skipSpace(string){
  var skippable = string.match(/^(\s|#.*)*/);
  return string.slice(skippable[0].length);
}

console.log(parse("# hello \n x"));
console.log(parse("a #hello \n #two \n ()"));

specialForms["set"] = function(args,env){
  if(args.length != 2 || args[0].type != "word") throw new SyntaxError("Bad use of set");
  var varName = args[0].name;
  var value = evaluate(args[1],env);
  for(var scope=env;scope;scope=Object.GetPrototypeOf(scope)){
    if(Object.prototype.hasOwnProperty.call(scope,varName))
      { scope[varName] = value;
        return value;
      }
  }
  throw new ReferenceError("Variable does not exist in scope " + varName);
};

run("do(define(x, 4),",
    "   define(setx, fun(val, set(x, val))),",
    "   setx(50),",
    "   print(x))");
run("set(quux, true)");
