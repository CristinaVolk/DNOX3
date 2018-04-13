const mongoose = require('mongoose');
const userModel = require('./../models/user');
const CONFIG=require('./config');
 //to powinno być w pliku konfiguracyjnym
//nie używaj czystego MongoDB , lepiej Mongoose, juz naprawiam, dlatego async nie działał:P bo to czysty MongoDB, nie ma promise
let _connection = null;

let open = function() {

  _connection = mongoose.createConnection(CONFIG.DB_URL, {    
    auth:{
      password: CONFIG.DB_URL_AUTH.PASSWORD,
      user:CONFIG.DB_URL_AUTH.USER
    }
  });
              _connection.on("open", () => {
                  console.log("info", "Connected to DB");
              });
              _connection.on("disconnected", () => {
                  console.log("info", "Disconnected from DB");
              });
              _connection.on("error", () => {
                  console.log("error", "DB connection error");
              });
              mongoose.Promise = global.Promise;
              userModel(_connection); //here you will add another models


};

let get = function() {
  return _connection;
};

module.exports = {
  open : open,
  get : get
};
