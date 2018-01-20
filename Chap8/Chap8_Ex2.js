var box={
  locked:true;
  _content=[];
  unlock:function()(this.locked=false;)
  lock:function(){this.locked=true};
  get _content(){
    if(this.locked){throw new Error("Locked!");}
    return this._content;
  }
};

function withBoxUnlocked(body){
  var locked=box.locked;
  if(!locked){return body();}
  box.unlock();
  try{
    return body();
  }finaly{
    box.lock();
  }
}

withBoxUnlocked(function(){
  box.content.push("Gold piece");
})


////////////////////////////////////////////////////////////////////////////////
var box={
  locked:true,
  _content:[],
  unlock:function(){this.locked=false;},
  lock:function(){this.locked=true;},
  get _content(){
    if(this.locked){throw new Error("Locked!");}
    return this._content;
  }
};

function withBoxUnlocked(body){
  var locked=box.locked;
  if(!locked){return body();}
  box.unlock();
  try{
    return body();
  }finally{
    box.lock();
  }
}

console.log(box.locked);
console.log(box.get);

withBoxUnlocked(function(){
  box.content.push("Gold piece");
});

console.log(box.locked);
console.log(box.get);
