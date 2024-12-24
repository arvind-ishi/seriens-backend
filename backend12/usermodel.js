const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/testing`);


const userSchema = mongoose.Schema({
    name : String,
    age :Number,
    email:String,
    password:String
})

const models = mongoose.model('user',userSchema)

module.exports = models;
