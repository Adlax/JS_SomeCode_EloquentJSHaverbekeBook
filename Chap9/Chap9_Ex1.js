var regexp1=/ca[rt]/;

var regexp2=/pr?op/;

var regexp3=/ferr(et|y|ari)/;

var regexp4=/ious\b/;

var regexp5=/\s[.,:;]/;

var regexp6=/\w{7,}/;

var regexp7=/\b{[^\We]+\b/;

console.log(regexp7.test("red platypus"));
console.log(regexp7.test("wobbling nest"));
console.log(regexp7.test("earth bed","learning ape"));
