const fs = require('fs');// importing the file system all the fasalisties 


//const { Buffer }= require('node:buffer');//convet the binary to the handle


//fs from the file is creating and the data is adding 
// fs.writeFile("hey.txt","data is on ",function(err){
  // if(err){
    // console.error(err);
// 
// 
  // }else{
    // console.log("done");
// 
// 
  // }
// })
// 
// 
// 
// const data = new Uint8Array(Buffer.from('Hello Node.js'));
// fs.writeFile('message.txt', data, (err) => {
  // if (err) throw err;
  // console.log('The file has been saved!');
// });
// 

//const datas = ("this is the data is on ")

// fs.writeFile("ram.txt",datas,function(err){
  //  
    // if(err){
        // console.error(err);
// 
    // }
// 
    // else{
        // console.log("dones")
    // }
// })


fs.writeFile('sita.html','hi this is the data ', function(err){
  if(!err){
    console.log("done");

  }else{
    console.error(err);

  }
})
let datas01 = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>ram is on duty </h1>
    
    <script src="app.js"></script>
</body>
</html>`

fs.appendFile("sita.html",datas01,function(err){
  if(err){
    console.error(err);

  }else{
    console.log('ho gay')
  }
})


fs.rm("..\\ram.txt",function(err){
  if(err){
    console.error(err);

  }else{
    console.log("remove");

  }
})