const mongoose = require('mongoose');
//var bcrypt = require('bcryptjs');
let Schema = mongoose.Schema;

const FlatSchema = new Schema({
  location:{
    type: String,
    required: true,
  },
  street:{
    type: String,
    required: true
  },
  number:{
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  Rooms:[String]
});


const connectWithDB = (connection) => {
  const Flat = connection.model('Flat', FlatSchema, 'Flat');
}
 module.exports = connectWithDB;
