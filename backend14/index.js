// const express = require('express');
// const cookieparser = require('cookie-parser');
// const bcrypt = require('bcrypt');
// const mongoose = require('mongoose');

// const app = express();

// app.use(cookieparser());


// app.get('/', function(req,res){
//     res.cookie('name','harshita')
//     res.end("done");

// })

// app.get('/read', function(req,res){
//     console.log(req.cookies)
// })


// app.listen(3000)


var express = require('express')
var cookieParser = require('cookie-parser')

//bcrypt 
const bcrypt = require('bcrypt');

// const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

 const saltRounds = 10;
const myPlaintextPassword = 's0/\/\p4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';
// 
bcrypt.genSalt(saltRounds, function(err,salt){
    bcrypt.hash(myPlaintextPassword, salt, function(err ,hash){
        console.log(hash);

    })

})
// 

var app = express()
app.use(cookieParser())

app.get('/', function (req, res) {
//cookies set karne ke liye respose use kare 
    res.cookie("name", "arvinds");
    res.send('/ page ')
})


app.get('/read', function (req, res) {
//read karne ke liya requist use kare cookies 
    // Cookies that have not been signed
    console.log('Cookies: ', req.cookies)
    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies)

    
    res.send("read page ")

})

app.listen(3000)

// curl command that sends an HTTP request with two cookies
// curl http://127.0.0.1:8080 --cookie "Cho=Kim;Greet=Hello"