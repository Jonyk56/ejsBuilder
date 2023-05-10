var ejsBuilder = require("./index");
var x = new ejsBuilder();
x.setInput("hi <%= 'hi' %>")
console.log(x.render())