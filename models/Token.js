const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const saltRounds = 10;

const TokenSchema = new mongoose.Schema({
  cur_time:{
    type:Date,
    required:true
  },
  email: {
    type: String,
    required:true
  },
  token: {
    type: String,
    required: true,
    unique:true
  },
})



module.exports = mongoose.model('Token', TokenSchema)