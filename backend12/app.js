const express = require('express');

const usermodel = require('./usermodel')

const app = express();

app.get('/',function(req,res){
    res.send('hello worlkd');

});

//create 
app.get('/create',async function(req,res){
  let createuser = await usermodel.create({
        name:"ram",
        age:23,
        email:"ram@gmail.com",
        password:"ram123"

    })
    res.send(createuser);

})

//read
app.get('/read', async function(req,res){
    let readuser = await usermodel.find();
    res.send(readuser);

})

//update
app.get('/update', async function (req,res) {
    let updateuser = await usermodel.findOneAndUpdate({name:"arvind",age:21,new :true});
    res.send(updateuser);

})

//delete
app.get('/delete' ,async function(req,res){
    let deleteuser = await usermodel.findOneAndDelete({name:'arvind'});
    res.send(deleteuser);

})


let port = 3000;

app.listen(port,function(){
    console.log(`server is running at port ${port}`);

})