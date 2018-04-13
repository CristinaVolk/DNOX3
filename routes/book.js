var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const userModel = require('../models/user.js');
const User = mongoose.model('User');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('WELCOME TO DNO!');
});

router.post('/register', (req,res,next)=>{
  var name = req.body.name;
  var surname = req.body.surname;
  var email = req.body.email;
  var password = req.body.password;
  var password2 = req.body.password2;
  var isAdmin=req.body.isAdmin;
  console.log('aa')

  User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/*  User.findOne({
   email:email
 }, (err, user) => {
   console.log('aa')
   if (err){
     console.log(err);
     res.status(400).json('error registering the user');
   }
    if(user) {
      res.status(200).json('the user with that email is already registered');
 } if (!user){
         let newUser = new User({

         name,
         surname,
         email,
         password
         });
         newUser.save(function(err, result){
           console.log('bb');
           if(error){
             console.log(err);
             return;
           } else {
             res.json(result)
                //TODO: redirect to the login view when it's made
         }
       });
  });
   })
 });*/


module.exports = router;
