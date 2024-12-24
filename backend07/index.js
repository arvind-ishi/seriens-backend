const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// parse the data readable for
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// view engine to get 
app.set('view engine', 'ejs');


//static file to come in action by public folder\
app.use(express.static(path.join(__dirname,'public')));

// this is the / shalas route 
app.get('/', function(req,res){
    fs.readdir(`./files` ,function(err,files){// readdir is read the file data file alse 
        res.render('index',{ files:files});//in the ejs send the files name to data file by 
    })
})

//files read by the this method 
app.get('/file/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8", function(err, filedata){
        res.render('show',{filename: req.params.filename, filedata: filedata})


    })
})

//edit page 
// app.get('/edit/:filename', function(req,res){
    // res.render('edit', { filename : req.params.filename})
// })
// 
// app.post('/edit',function(req,res){
    // fs.rename(`./files/${req.params.previous}`,`./files/${req.params.new}`,function(err){
        // res.redirect("/");
    // })
    // 
// 
// });

// Edit page by the method 
app.get('/edit/:filename', function(req, res) {
    res.render('edit', { filename: req.params.filename });
});

app.post('/edit', function(req, res) {
    const oldName = req.body.previous;
    const newName = req.body.new;

    // Rename the file
    fs.rename(`./files/${oldName}`, `./files/${newName}`, function(err) {
        if (err) {
            console.error(err);
            return res.status(500).send('Error renaming file');
        }
        res.redirect('/');
    });
});


// Delete file route// unlink by the delete the pages files direct with out creating file

app.post('/delete/:filename', function(req, res) {
    fs.unlink(`./files/${req.params.filename}`, function(err) {
        if (err) {
            console.error(err);
            return res.status(500).send('Error deleting file');
        }
        res.redirect('/');
    });
});

// another file to build 

// app.get('/another', function(req,res){
    // fs.readdir(`./files` ,function(err,files){
        // res.render('index',{ files:files});
    // })
// })
// app.post('/another',function(req,res){
    // fs.writeFile(`./files/${req.body.title.split(" ").join('')}.html`,req.body.details,function(err){
        // res.redirect('/');
// 
    // })
// })


app.post('/create',function(req,res){
    // split create the array in the string space based all text in array jion can connect all 
   fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
    res.redirect("/");// redirectd to the / route after 
   })
  
})



app.listen(3000,function(){
    console.log(`server is running at port 3000`);

})




































