const express = require('express');
const path = require('path');

const userModels = require('./models/user');



const app = express();


app.set('view engine' , 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
//static data in this used 
app.use(express.static(path.join(__dirname,'public')));


//routers start

app.get('/',function(req,res){
    res.render('app');

})


app.get('/read', async function(req,res){
    let alluser =await userModels.find();

    res.render('read',{users:alluser});

})

//update the user 

app.get('/edit/:userid',async function (req,res) {
  let one =  await userModels.findOne({_id :req.params.userid})
 res.render('edit',{one})
})


app.post('/update/:userid',async function (req,res) {
    let one =  await userModels.findOneAndUpdate({_id :req.params.userid},{
        name:req.body.name,
        email:req.body.email,
        image:req.body.image
        
    },{new :true})

   res.redirect('/read')
  })
app.get('/delete/:id', async function (req,res) {
    let user = await userModels.findOneAndDelete({ _id : req.params.id });
    // res.send(deleteduser);
  res.redirect('/read');
})

app.post('/create',async function(req,res){

  let createduser =  await userModels.create({
            name:req.body.name,
            email:req.body.email,
            image:req.body.image
            
    })
  res.redirect('/read');

})





let port = 3000;

app.listen(port,function(){
    console.log(`server is running on port ${port}`);

})







