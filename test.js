var ejsBuilder = require("./index");
var x = new ejsBuilder();
x.setInput("hi <%= 'hi' %>")
console.log(x.render())

x.setInput("./test.ejs")
console.log(x.renderFile());
x.setOption("delimiter", '$')
x.renderFile((err,dat) => console.log(dat))