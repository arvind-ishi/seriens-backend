
const express = require("express");
const path = require('path');

const app = express();


// like the parsers used in the from by this lines 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//this is the static files to used to get
// all the path can by the __dirname currunt folder provided


app.use(express.static(path.join(__dirname,'public')));


//for the ejs use in the code this line 
//setting up ejs for ejs pages
 app.set("view engine" , "ejs");



// this is the route 
app.get('/',function(req,res){
    res.render('index');// use the view page to show render is used file name also 



})


// dynamic routing 
   // the repeting the one route is chaging mutiple time 
   // that route can be the dynamic create by : 

app.get('/profile/:username',function(req,res){
   // res.send(req.params)
    res.send(`my name is ${req.params.username}`)
})

app.get('/about/:username/:age', function(req,res){
    res.send(`welcome to the username ${req.params.username} and age is ${req.params.age}`)
})


// server is lisning at this port 
app.listen(3000, function(){
    console.log(`its runnnig `);

})