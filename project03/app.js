const express = require('express');
const app = express();
const path = require('path');
// 
// 
// 
// 
const userSchema = require('./models/user');
let postSchema = require('./models/post');
// 
app.set('view engine', 'ejs');
// 
//bcrypt how to the data 
const bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const upload = require('./config/multercongfig');

// 
// 
// 
app.use(cookieParser());
// 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// 
// multer setup in file 
// const multer = require('multer');
// const crypto = require('crypto');
// 

// const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
        // cb(null, './public/image/upload')
    // },
    // filename: function (req, file, cb) {
        // crypto.randomBytes(12, function (err, bytes) {
        //   const fn = bytes.toString("hex") + path.extname(file.originalname);
        //   cb(null, fn);
// 
        // })
    // }
// 
// })
// 
// 


app.get('/', function (req, res) {
    res.render('index');

})

app.get('/test', function (req, res) {
    res.render('test');

})

app.post('/upload', upload.single('image') ,isLoggedIn , async function (req, res) {
    console.log(req.file)
  const user = await userSchema.findOne({email:req.user.email});
      

  user.profilepic = req.file.filename;
  await user.save();

  res.redirect('/profile');



})




//profile page 

app.get('/profile', isLoggedIn, async function (req, res) {
    let user = await userSchema.findOne({ email: req.user.email }).populate('posts')
    // userget.populate("posts")

    res.render('profile', { user });

})


// like 
// app.get('/like/:id', isLoggedIn, async function (req, res) {
// 
// 
// let post = await postSchema.findOne({ _id: req.params.id }).populate('user');
// 
// if (post.likes.indexOf(req.user.userid) === -1) {
// post.likes.push(req.user.userid);
// 
// } else {
//   post.likes.splice(post.likes.indexOf(req.user.userid), 1);
// 
// }
//  console.log(req.user);
// 
// 
// post.likes.push(req.user.user);
// await post.save();
// 
// res.redirect('/profile');
// 
// })


app.get('/like/:id', isLoggedIn, async function (req, res) {
    let post = await postSchema.findOne({ _id: req.params.id }).populate('user');

    // Check if the user has already liked the post
    if (post.likes.indexOf(req.user.userid) === -1) {
        post.likes.push(req.user.userid); // Add the user ID to likes
    } else {
        post.likes.splice(post.likes.indexOf(req.user.userid), 1); // Remove the user ID from likes
    }

    await post.save(); // Save the updated post

    res.redirect('/profile'); // Redirect to the profile page
});




// app.get('/like/:id', isLoggedIn, async function (req, res) {
// try {
// Find the post by its ID
// let post = await postSchema.findById(req.params.id);
// 
// if (!post) {
// return res.status(404).send('Post not found');
// }
// 
//  Check if the user has already liked the post
// const userIndex = post.like.indexOf(req.user.user); // `req.user.user` contains the user's ID
// 
// if (userIndex === -1) {
//   User has not liked the post; add their ID to the likes
// post.like.push(req.user.user);
// } else {
// User has already liked the post; remove their ID from the likes
// post.like.splice(userIndex, 1);
// }
// 
// Save the post after updating
// await post.save();
// 
// Redirect back to the profile or previous page
// res.redirect('/profile');
// } catch (error) {
// console.error('Error while liking/unliking the post:', error);
// res.status(500).send('Internal Server Error');
// }
// });


///edit pge 
app.get('/edit/:id', isLoggedIn, async function (req, res) {
    let post = await postSchema.findOne({ _id: req.params.id }).populate('user')

    res.render('edit', { post });

})


//updte 
app.post('/update/:id', isLoggedIn, async function (req, res) {

    let post = await postSchema.findOneAndUpdate({ _id: req.params.id }, { content: req.body.content });

    res.redirect('/profile');


})

// app.post('/update/:id', isLoggedIn, async function (req, res) {
// let post = await postSchema.findOneAndUpdate({_id:req.params.id }, { content: req.body.content });
// 
// 
// res.redirect('/profile')
// 
// 
// }


//delete

app.get('/delete/:id', isLoggedIn, async function (req, res) {



    // Validate the ObjectId
    let post = await postSchema.findOneAndDelete({ _id: req.params.id });



    // Delete the
    // Redirect to the profile page after deletion
    res.redirect('/profile');




});









//post router 
app.post('/post', isLoggedIn, async function (req, res) {
    let user = await userSchema.findOne({ email: req.user.email });
    let { content } = req.body;
    // 
    let post = await postSchema.create({
        user: user._id,
        content,
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile');

})

app.post('/register', async function (req, res) {

    let { name, username, email, password, age } = req.body;

    // Check if email already exists in the database
    let existingUser = await userSchema.findOne({ email });

    if (existingUser) {
        return res.status(409).send('Email already exists'); // Conflict status code
    }

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            // Create a new user if email is unique
            let createdUser = await userSchema.create({
                name,
                username,
                email,
                password: hash,
                age,
            },)

            let token = jwt.sign({ email: createdUser.email, userid: createdUser._id }, "shhhh");
            res.cookie('token', token);

            res.status(201).redirect('/login'); // Success status code for resource creation
            // post.user.push(createdUser.id)
            // await post.save();

        })
    })
});

//login page 
app.get('/login', function (req, res) {

    res.render('login');
})


///login page logic 
app.post('/login', async function (req, res) {
    let { email, password } = req.body;

    let user = await userSchema.findOne({ email });
    if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {

                let token = jwt.sign({ email: user.email, userid: user._id }, "shhhh");
                res.cookie('token', token);

                //return  res.status(200).send('login susssefull');
                return res.redirect('/profile');

            } else {
                return res.status(401).send('user is not exits');

            }
        })
    }
})

/// protected routes middleware to login in the page 

function isLoggedIn(req, res, next) {
    //  
    if (req.cookies.token === "") {
        return res.status(401).redirect('/login');
        // 
        // 
    } else {
        let data = jwt.verify(req.cookies.token, "shhhh");
        req.user = data;
        next();
        // 
    }
}

//logout page 

app.get('/logout', function (req, res) {
    res.cookie('token', "");

    res.redirect('/login');
    // 
})




let port = 3000;

app.listen(port, function () {
    console.log(`server is runnnig at port ${port}`);

})






















//new

// const express = require('express');
// const app = express();
// const path = require('path');
//
// const userSchema = require('./models/user');
// const postSchema = require('./models/post');
//
// app.set('view engine', 'ejs');
//
//Import required packages
// const bcrypt = require('bcrypt');
// const cookieParser = require('cookie-parser');
// const jwt = require('jsonwebtoken');
//
//Middleware
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));
//
//Home route
// app.get('/', function (req, res) {
// res.render('index');
// });
//
//Profile route
// app.get('/profile', isLoggedIn, async function (req, res) {
// try {
//Find user and populate posts along with the user details in the post
// let user = await userSchema
// .findOne({ email: req.user.email })
// .populate({
// path: 'posts',
// populate: {
// path: 'user', // Populate the user field in the posts
// model: 'User',
// },
// });
//
// res.render('profile', { user });
// } catch (error) {
// console.error("Error fetching profile:", error);
// res.status(500).send("Internal Server Error");
// }
// });
//
//Create a new post
// app.post('/post', isLoggedIn, async function (req, res) {
// try {
// let user = await userSchema.findOne({ email: req.user.email });
// let { content } = req.body;
//
// let post = await postSchema.create({
// user: user._id,
// content,
// });
//
// user.posts.push(post._id);
// await user.save();
//
// res.redirect('/profile');
// } catch (error) {
// console.error("Error creating post:", error);
// res.status(500).send("Internal Server Error");
// }
// });
//
//Register a new user
// app.post('/register', async function (req, res) {
// try {
// let { name, username, email, password, age } = req.body;
//
// Check if email already exists
// let existingUser = await userSchema.findOne({ email });
//
// if (existingUser) {
// return res.status(409).send('Email already exists'); // Conflict status code
// }
//
// bcrypt.genSalt(10, function (err, salt) {
// bcrypt.hash(password, salt, async function (err, hash) {
//  Create a new user
// let createdUser = await userSchema.create({
// name,
// username,
// email,
// password: hash,
// age,
// });
//
// let token = jwt.sign(
// { email: createdUser.email, user: createdUser._id },
// "shhhh"
// );
// res.cookie('token', token);
//
// res.status(201).redirect('/profile'); // Redirect to profile
// });
// });
// } catch (error) {
// console.error("Error registering user:", error);
// res.status(500).send("Internal Server Error");
// }
// });
//
//Login route
// app.get('/login', function (req, res) {
// res.render('login');
// });
//
//Login logic
// app.post('/login', async function (req, res) {
// try {
// let { email, password } = req.body;
//
// let user = await userSchema.findOne({ email });
// if (user) {
// bcrypt.compare(password, user.password, function (err, result) {
// if (result) {
// let token = jwt.sign(
// { email: user.email, user: user._id },
// "shhhh"
// );
// res.cookie('token', token);
// return res.redirect('/profile');
// } else {
// return res.status(401).send('Invalid credentials');
// }
// });
// } else {
// return res.status(404).send('User does not exist');
// }
// } catch (error) {
// console.error("Error during login:", error);
// res.status(500).send("Internal Server Error");
// }
// });
//
//Middleware to check if the user is logged in
// function isLoggedIn(req, res, next) {
// if (!req.cookies.token) {
// return res.status(401).redirect('/login');
// } else {
// try {
// let data = jwt.verify(req.cookies.token, "shhhh");
// req.user = data;
// next();
// } catch (error) {
// console.error("Error verifying token:", error);
// res.status(401).redirect('/login');
// }
// }
// }
//
//Logout route
// app.get('/logout', function (req, res) {
// res.clearCookie('token');
// res.redirect('/');
// });
//
//Start the server
// let port = 3000;
// app.listen(port, function () {
// console.log(`Server is running at port ${port}`);
// });
// 