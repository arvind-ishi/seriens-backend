const express =require('express');

const bcrypt = require('bcrypt');
const fs = require('fs');

const app = express();

app.get('/',function(req,res){
    res.send('hello world');
// this is the encription of the password learn
    // bcrypt.genSalt(10,function(err,salt){
        // console.log(salt);
        // bcrypt.hash('pass123',salt,function(err,hash){
            // console.log(hash);

        // })

    // })


    //##### compare means decript the password
    bcrypt.compare('pass123','$2b$10$a.ET7/LmtAU/XwnMu8oFoOBn1fLYKbZ8g40/SZABUTzxNIVtPv.E.',function(err,result){
        console.log(result);

    })

})


// fs.writeFile('nodes.txt', "pass123",function(err){
    // console.log(err);
    // 
// })


app.listen(4000)