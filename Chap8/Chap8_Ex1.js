function MultiplicatorUnitFailure(message){
  this.message=message;
}
MultiplicatorUnitFailure.prototype=Object.create(Error.prototype);


function multiply(a,b){
  return a*b;
}


function assert(nb){
  if(nb<5){return true;}
  else{throw new MultiplicatorUnitFailure("Ca merde!");}
}


function primitiveMultiply(){
  try{
    for(;;){
      var a=prompt("Premier nombre","");
      var b=prompt("Deuxieme nombre","");
      var res=multiply(a,b);
      var chance=Math.floor(Math.random()*10);
      var test=assert(chance);
      if(test=true){
        console.log(res);
        break;
      }
    }
  }catch(error){
      if(error instanceof MultiplicatorUnitFailure){console.log(error.message);}
  }
}


primitiveMultiply();

///Correction///////////////////////////////////////////////////////////////////
function MultiplicatorUnitFailure(message){
  this.message=message;
}
MultiplicatorUnitFailure.prototype=Object.create(Error.prototype);

function primitiveMultiply(a,b){
  if(Math.random()<0.5){return a*b;}
  else{throw new MultiplicatorUnitFailure("ca merde");}
}

function reliableMultiplicator(a,b){
  for(;;){
    try{
      primitiveMultiply(a,b);
    }catch(error){
      if(error instanceof MultiplicatorUnitFailure){console.log(error.message);}
    }
  }
}

console.log(reliableMultiplicator(8,8));


function MultiplicatorUnitFailure(){}

function primitiveMultiply(a,b){
  if(Math.random()<0.5){return a*b;}
  else{throw new MultiplicatorUnitFailure();}
}

function reliableMultiplicator(a,b){
  for(;;){
    try{
      return primitiveMultiply(a,b);
    }catch(error){
      if(!error instanceof MultiplicatorUnitFailure){throw error;}
    }
  }
}

console.log(reliableMultiplicator(8,8));
