const mongoose = require('mongoose');


//mongoose.connect('mongodb+srv://avij70507:blogs123@blogs.rhw3d.mongodb.net/shiv');

mongoose.connect('mongodb://127.0.0.1:27017/shivdb')

const userSchema = new mongoose.Schema({
    name : String,
    username: String,
    email : String,
    password : String,
    age: Number,
    profilepic :{
        type:String,
        default: "default.jpg"
    },

    posts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ]

})


module.exports = mongoose.model('user', userSchema);
// 