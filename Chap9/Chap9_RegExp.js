var reg1=new RegExp("abc");
console.log(reg1.test("abcde"));

var reg2=/abc/;
console.log(reg2.test("abcde"));

var reg3=/eighteen\+/;
console.log(reg3.test("eighteen+"));

console.log(/[0-9]/.test("in 1992"));

var dateTime=/\d\d-\d\d-\d\d\d\d \d\d:\d\d/;
console.log(dateTime.test("30-01-2003 15:30"));

var notBinary=/[^01]/;
console.log(notBinary.test("10000010011100111"));
console.log(notBinary.test("10000010012100111"));

console.log(/'\d+'/.test("'123'"));
console.log(/'\d+'/.test("''"));
console.log(/'\d*'/.test("'123'"));
console.log(/'\d*'/.test("''"));

var neighbor=/neighbou?r/;
console.log(neighbor.test("neighbour"));
console.log(neighbor.test("neighbor"));

var dateTime2=/\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
console.log(dateTime2.test("30-01-2003 1:30"));

var cartoonCrying=/boo+(hoo+)+/i;
console.log(cartoonCrying.test("Booooohooohooohooo"));

var match=/\d+/.exec("one two 100");
console.log(match);
console.log(match.index);

console.log("one two 100".match(/\d+/));

var quotedText=/'([^']*)'/;
console.log(quotedText.exec("she sais 'hello'"));

console.log(/bad(ly)?/.exec("bad"));

console.log(/(\d)+/.exec("1234"));

console.log(new Date());
console.log(new Date(2009,11,9));
console.log(new Date(2009,11,9,12,59,59,999));
console.log(new Date(2009,11,9).getTime());
console.log(new Date(1260313200000));

function findDate(string){
	var dateTime=/(\d{1,2})-(\d{1,2})-(\d{4})/;
	var match=dateTime.exec(string);
	return new Date(Number(match[3]),Number(match[2]-1),Number(match[1]));
}
console.log(findDate("30-1-2003"));

console.log(/cat/.test("concatenate"));
console.log(/\bcat\b/.test("concatenate"));

var animalCount=/\b\d+ (pig|cow|chicken)s?\b/;
console.log(animalCount.test("15 pigs"));
console.log(animalCount.test("15 pigchickens"));

console.log("papa".replace("p","m"));
console.log("Borodubur".replace(/[ou]/,"a"));
console.log("Borodubur".replace(/[ou]/g,"a"));

console.log("Hopper, Grace\nMcCarthy, Jane\nTrichi, Pete".replace(/([\w]+), ([\w]+)/g,"$2 $1"));

var s="the cia and fbi";
console.log(s.replace(/\b(fbi|cia)\b/g,function(str){return str.toUpperCase();}));

var stock="1 lemon, 2 cabbages, and 101 eggs";
function minusOne(match,amount,unit){
	amount=Number(amount)-1;
	if(amount==1){unit=unit.slice(0,unit.length-1);}
	else if(amount==0){amount="no";}
	return amount+" "+unit;
}
console.log(stock.replace(/(\d+) (\w+)/g,minusOne));

function stripComments(string){
	return string.replace(/\/\/.*|\/\*[^]*?\*\//g,"");
}
console.log(stripComments("1 + /* 2 */3"));
console.log(stripComments("x=10;// ten!"));
console.log(stripComments("1 /* a */+/* b */1"));

var name="harry";
var text="Harry is a dickhead";
var regexp=new RegExp("\\b(" + name + ")\\b","gi");
console.log(text.replace(regexp,"_$1_"));

console.log(" word".search(/\S/));
console.log("    ".search(/\S/));

var pattern=/y/g;
pattern.lastIndex=3;
var match=pattern.exec("xyzzy");
console.log(match.index);
console.log(pattern.lastIndex);

var digit=/\d/g;
console.log(digit.exec("here it is; 1"));
console.log(digit.exec("and now; 2"));
console.log("Banana".match(/an/g));

var input="A string with 3 numbers in it 56 and 4";
var number=/\b(\d+)\b/g;
var match;
while(match=number.exec(input))
	console.log("Found",match[1],"at",match.index);

searchengine=http;//khbgvkdsbv
spitefulness=9.7
; comments starts by a semicolon
; each section concerns an individual enemy

[larry]
fullname=larry flint
type=rapist
website=rape.org

[gargamel]
fullname=gargy
type=magician
website=magic.comments

function parseINI(string){
	var currentSection={name: null,fields:[]};
	var categories=[currentSection];
	string.split(/\r?\n/).forEach(function(line){
		var match;
		if(/^\S(;.*)?$/.test(line)){return;}
		else if(match=line.match(/^\[(.*)\]$/)){currentSection={name:match[1],fields:[]};categories.push(currentSection);}
		else if(match=line.match(/^(\w+)=(.*)$/)){currentSection.fields.push({name:match[1],value:match[2]});}
		else {throw new Error("line"+line+" is invalid.");}
	});
	return categories;
}
