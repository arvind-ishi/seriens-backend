const express = require('express');
// express is variable in require is the geting all the features of the express in
//that and it stores in the express



// that variable call in the front of the app variable so all the feature using app 
// varible you can use 
const app = express();

//app.get(router , requiresthandler)


// this is the / route mean the 3000 port on lisning
app.get('/',function(req,res){// get is the method that can be get the data 
    res.send("mera anuj");

})

// profile route is lisning at the route and profile page see by on that route 
app.get("/profile",function(req,res){// req means request the can get data 
    // and res means response that can send data in the seb page to display 

    res.send('ram is comming');

})


// lisning the server my the port 3000 in the app 
app.listen(3000);
