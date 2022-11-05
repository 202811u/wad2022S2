var express= require('express');
var app = express();
var port = 3000;

var calculator = require('./calculator.js');

var routes = require('./routes.js');
app.use('/',routes);

// Start of original codes shifted to route.js
// app.get('/', function(req,res) {
//    res.send("Hello World"); 
// });
// app.get('/users', function(req,res) {
//    res.send(
//     {
//         name:'Thomas',
//         age:20,
//         hobby:'Badminton'
//     }
//    ); 
// });

// app.get('/hello', function(req,res) {
//    res.sendFile(__dirname+"/views/hello.html");
// });

// app.get('/calculator/add/2/3', function(req,res) {
//    res.send({
//        result:calculator.add(2,3)
//    });
// });

// app.get('/calculator/:operation/:num1/:num2', function(req,res) {
//    var operation = req.params.operation;
//    var num1 = parseInt(req.params.num1);
//    var num2 = parseInt(req.params.num2);
   
//    res.send({
//        operation: operation,
//        number1: num1,
//        number2: num2,
//        result:calculator[operation](num1, num2)
//    });
// });
// End of original codes shifted to route.js

app.listen(port,function() {
   console.log('Server started on port '+port); 
});