const express  = require("express");
const userModel = require('./userModel')

const app = express();

// app.use(express.json());
// app.use(express.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.send('hello worlkd');

})
 //create the user 
app.get('/create', async function(req,res){
    let created = await userModel.create({
        name: "radha",
        email : "radha@gmail.com",
        password : "radha123"
    })

    res.send(created);

})


//user read all have 
app.get('/read', async function(req,res){
   const read = await userModel.find();
   res.send(read);

})

//user update one 
app.get("/update", async function(req,res){
   let updatedata =await userModel.findOneAndUpdate({name:"jans",password: "123"});
   res.send(updatedata);

})

// one mo

//delete the one 
app.get("/delete", async function(req,res){
    let deletes = await userModel.findOneAndDelete({name:"radha"});
    res.send(deletes);

})


app.listen(3000,function(){
    console.log(`server is runnig `);

})