const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/project02`);

const models  =  mongoose.Schema({
      name : String,
      email: String,
      image : String
      

})

module.exports = mongoose.model('user', models);
