const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const User = require('./databaseController').get().model('User');
const CONFIG = require('./config.js');


module.exports.isAuthentic = (req,res,next) => {
  const bearerToken = req.headers['authorization'];
  if (!bearerToken) res.json({success: false, message: "couldn't find the token in authorization"});
  try {
    const decoded = jwt.verify(bearerToken, CONFIG.HASH_PASSWORD_SECRET);
    User
      .findById(decoded.id)
      .exec( function(err, user){
        if (err) res.json({success:false, message: "error finding user"});
        else if (!user) res.json({success:false, message:"user not found in the database"});
        else {
          req.body.isAdmin = user.isAdmin;
          next();
        }
       });
  }
  catch (err) {
    res.sendStatus(403);
  }
};
