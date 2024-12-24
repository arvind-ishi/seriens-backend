const express = require('express');
const cookieparser = require('cookie-parser');
const app = express();

app.use(cookieparser());


app.get('/', function(req,res){
    res.cookie('name','harshita')
    res.end("done");

})

app.get('/read', function(req,res){
    console.log(req.cookies)
})


app.listen(3000)