var calculator = require('./calculator.js');

    var router = require('express').Router();
    router.get('/', function (req,res) {
       res.send("Hello World"); 
    });
    router.get('/users', function (req,res) {
       res.send(
        {
            name:'Thomas',
            age:20,
            hobby:'Badminton'
        }
       ); 
    });

    router.get('/hello', function (req,res) {
        res.sendFile(__dirname+"/views/hello.html");
    });

    

    router.get('/calculator/add/2/3', function (req,res) {
        let result = calculator.add(2,3);
        res.send({
            result:result
        });
    });

    

    router.get('/calculator/:operation/:num1/:num2', function (req,res) {
        var operation = req.params.operation;
        var num1 = parseInt(req.params.num1);
        var num2 = parseInt(req.params.num2);

        res.send({
            operation: operation,
            number1: num1,
            number2: num2,
            result:calculator[operation](num1, num2)
        });
    }); 
    

module.exports = router;