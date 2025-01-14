const express = require('express');

const app = express();

const jwt = require('jsonwebtoken');

const cookieParser = require('cookie-parser')

app.use(cookieParser());


app.get('/', function (req, res) {


    let token = jwt.sign({ email: "avi@gmail.com" }, "secret")
    res.cookie("token", token)
    res.send('hello world');



})

//verifying the user is that have or not 
app.get('/read', function (req, res) {
    res.send('read page ');
    console.log(req.cookies.token);

    let done = jwt.verify(req.cookies.token, "secret")
    console.log(done)

})
app.listen(3002);
