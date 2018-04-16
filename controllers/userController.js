const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const userModel = require('../models/user');
const User = mongoose.model('User');
const CONFIG = require('./config');


module.exports.isSubscribing = (array, id) => {
  var flag=false;
  var i=0;
  while(i<=array.length){
    if(String(array[i])===String(id)){
      flag=true;
      break;
    }else {
      i++;
       }
    }
return flag;
};


module.exports.isAuthentic = (req,res,next) => {
  /* const bearerToken = req.headers['authorization'];
  if (!bearerToken) res.json({success: false, message: "couldn't find the token in authorization"});
  try {
    const decoded = jwt.verify(bearerToken, CONFIG.HASH_PASSWORD_SECRET);
   User
      .findById(decoded.id)
      .exec( function(err, user){
        if (err) res.json({success:false, message: "error finding user"});
        else if (!user) res.json({success:false, message:"user not found in the database"});
        else {
          req.userId = decoded.id;
          next();
        }
       }); 
       
  }
  catch (err) {
    res.sendStatus(403);
  } */
  console.log(req.headers);
  var token = req.headers['authorization'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, CONFIG.HASH_PASSWORD_SECRET, function(err, decoded) {
    if (err)
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
};


module.exports.isAdmin = (req,res,next) => {
  let isAdmin = req.body.isAdmin;
  if(isAdmin == null) res.json({success:false, message:"couldn't get the information weather the user is admin or not"});
  if(!isAdmin) res.json({success:false, message: "user is not an admin so he is not authorized to take that action"})
  if(isAdmin) next();
};
