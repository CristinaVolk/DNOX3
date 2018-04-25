<<<<<<< HEAD
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
=======
const mongoose = require('mongoose');
//var bcrypt = require('bcryptjs');
let Schema = mongoose.Schema;
const RoomSchema = new Schema({
  title:String,
  number:Number,
  description:String,
  price:Number,
  number_of_rooms:Number,
  number_of_free_rooms:Number
});
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
  Rooms:[RoomSchema]
});


const connectWithDB = (connection) => {
  const Flat = connection.model('Flat', FlatSchema, 'Flat');
}
 module.exports = connectWithDB;
>>>>>>> master
