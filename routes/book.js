const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const router = express.Router();
const User = require('./../controllers/databaseController').get().model('User');


router.get('/', async (req, res)=>{
  await res.send('Express RESTful API');
});

router.post('/register',  (req, res) => {

  var name = req.body.name;
  var surname = req.body.surname;
  var email = req.body.email;
  var password = req.body.password;
  var password2 = req.body.password2;
  var isAdmin=req.body.isAdmin;

  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('surname', 'Surname is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
  req.checkBody('isAdmin').optional();

  let errors = req.validationErrors();
  if (errors){
    console.log(errors);
  }else {
    User.findOne({
      email:email}, (err, us)=>{
        if (err){
          console.log(err);
          res.status(404).json(err);
        }
         if(us){
           res.status(200).json('the user with that email is already registered');
      }
      if(!us){
        let user =  new User(req.body).save();
        console.log(user);
        res.json(user);
      }
    })
  }
});

router.post('/login', (req, res)=>{
  var email = req.body.email;
  var password = req.body.password;

  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();

  User.findOne({
    email:email
  }, (err, user)=>{
    if (err){
      console.log(err);
      res.status(400).json(err);
    }
     if(user) {
   res.status(200).json({success: true, message: "Zaletaj w dno k elite"})
 } else {
   res.status(200).json({success: false, message: "wrong data provided, cannot log in"})
 }
});
});




/*

  User.findOne({
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
