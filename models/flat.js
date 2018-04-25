const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const RoomSchema = new Schema({
  title:String,
  number:Number,
  description:String,
  price:Number,
  number_of_rooms:Number,

  number_of_free_rooms:Number,
  data:{
    type:Date
  }
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

  Rooms:[RoomSchema],
  data:{
    type:Date,
    default:Date.now()
  }
});

const connectWithDB = (connection) => {
  const Flat = connection.model('Flat', FlatSchema, 'Flat');

}
 module.exports = connectWithDB;
