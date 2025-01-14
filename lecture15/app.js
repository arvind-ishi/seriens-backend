const express = require('express');
const app = express();

const cookiepaser = require('cookie-parser');
const path = require('path');

//user modle from the database from the data store and get by this schema by this imports

const userSchema = require('./models/user.js');

//password to encript for used and compare also

const bcrypt = require('bcrypt');

// jsonweb token set to cookie save 
const jwt = require('jsonwebtoken');




//middaleware 
app.use(cookiepaser());//cookie paser executed

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//static files with public folder
app.use(express.static(path.join(__dirname, 'public')));

//ejs setup vies folder 
app.set('view engine', 'ejs');


// routers part 

app.get('/', function (req, res) {
    res.render("index");


})
//create user part register p ge

app.post('/create', function (req, res) {


    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, async function (err, hash) {
           // console.log(hash)
            const createduser = await userSchema.create({
                username: req.body.username,
                email: req.body.email,
                password: hash,
                age: req.body.age
            })
    
            var token =  jwt.sign({email :req.body.email},"shhhhhhh");
            res.cookie('token',token);
            res.send(createduser);
        })
    })

})



//login page render the page 
app.get('/login', function(req,res){
    res.render('login')
})



//login page 
app.post('/login', async function(req,res){
let  userhave =  await userSchema.findOne({email:req.body.email});
    //console.log(userhave);
    if(userhave){
        bcrypt.compare(req.body.password,userhave.password, function(err,result){
            if(result){
                var token =  jwt.sign({email :userhave.email},"shhhhhhh");
                res.cookie('token',token);
                res.send('you are login page on ')
               
               
            }else{
                res.send("not login");

            }
        })
       // console.log(userhave.password,req.body.password);

    }else{
        res.send('not the user exits');

    }

})



// logout the acount 
app.get('/logout',function(req,res){
    //res.clearCookie("token")
   // res.cookie('token', '', { expires: new Date(0) });
   res.cookie('token' ,'');

    res.redirect('/')
})



let port = 3000;

app.listen(port, function () {
    console.log(`server is ruinnig at port ${port}`)
});
