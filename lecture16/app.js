const express = require('express');
const app = express();


const userSchema = require('./models/user');
const postSchema = require('./models/post');



app.get('/',function(req,res){
    res.send('hello world');

})


app.get('/create', async function(req,res){
 let createduser = await userSchema.create({
    username: "arvind",
    email: "avij70507@gmail.com",
    age :21,
    
   })
   res.send(createduser);


})


app.get('/post/create', async function(req,res){
    let createdpost = await postSchema.create({
        postData :"this is the my frist post" ,
        userID: "676c5b11bf5ba0a005765334",

    })

    let user = await userSchema.findOne({_id:"676c5b11bf5ba0a005765334"});
    user.posts.push(createdpost._id);
    await user.save();


    res.send({createdpost,user});

})


app.listen(3000);
