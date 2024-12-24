const express =require('express');
const app = express();

const path = require('path');
// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the views directory (optional, defaults to './views')
 app.set('views', './views');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));


app.get('/',function(req,res){
    res.render('index');

});

app.get('/read',function(req,res){
    res.render('read');
    
})


let port = 3000;

app.listen(port,function(){
    console.log(`server is running at port ${port}`);

})



