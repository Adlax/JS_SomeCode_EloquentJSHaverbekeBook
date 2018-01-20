////////////////////////////////////////////////////////////////////////////////
function promptNumber(question){
  var result=Number(prompt(question,""));
  if(isNaN(result)){return null;}
  else{return result;}
};

console.log(promptNumber("un nombre svp?"));


////////////////////////////////////////////////////////////////////////////////
function promptDirection(question){
  var result=prompt(question,"");
  if(result.toLowerCase()=="right"){return "R";}
  if(result.toLowerCase()=="left"){return "L";}
  throw new InputError("Invalid direction mec ; "+result);
};

function look(){
  var result=promptDirection("Quelle direction?");
  if(result=="L"){return "fenetre";}
  if(result=="R"){return "porte";}
};

try{
  console.log("Yu see",look());
}catch (error){
  console.log("heuuu...ca a merde kkpart ; "+error);
}


////////////////////////////////////////////////////////////////////////////////
var context=null;

function withContext(newContext,body){
  var oldContext=context;
  context=newContext;
  try{
    return body();
  }finally{
    context=oldContext;
  }
};

try{
  withContext(5,function(){
    if(context<10){throw new Error("pas assez cher mon fils");}
  });
}catch(error){
  console.log("Ignoring "+error);
}

console.log(context);

////////////////////////////////////////////////////////////////////////////////
for(;;){
  try{
    var dir=promptDirection("Where?");
    console.log("You chose ",dir);
    break;
  }catch(error){
    console.log("Not a valid direction. Try again");
  }
}

////////////////////////////////////////////////////////////////////////////////
function InputError(message){
  this.message=message;
  this.stack=(new Error()).stack;
}
InputError.prototype=Object.create(Error.prototype);
InputError.prototype.name="InputError";

for(;;){
  try{
    var dir=promptDirection("Where?");
    console.log("You chose ",dir);
    break;
  }catch(error){
    if(error instanceof InputError){console.log("InputError. Try again");}
    else{throw error;}
  }
}


////////////////////////////////////////////////////////////////////////////////
function AssertionFailed(message){
  this.message=message;
}
AssertionFailed.prototype=Object.create(Error.prototype);

function assert(test,message){
  if(!test){
    throw new AssertionFailed(message);
  }
}

function lastElement(array){
  assert(array.length>0,"tableau vide");
  return array[array.length-1];
}

try{
  console.log(lastElement([1,2,3,4]));
}catch(error){
  console.log(error);
}
