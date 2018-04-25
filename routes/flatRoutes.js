const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const router = express.Router();
const bcrypt = require ('bcryptjs');
const async = require('async');
const jwt = require('jsonwebtoken');
const CONFIG = require('./../controllers/config.js');
const UserController = require('./../controllers/userController.js');
const Flat = require('./../controllers/databaseController').get().model('Flat');

//get all flats
/* router.get('/flats', async (req, res)=>{
  Flat.find({}, (err, result)=>{
    if(err){
      console.log("Error finding");
      res.status(500).json(err);
    }else{
       res.status(200).json(result);
    }
  })
}); */
router.get('/flats', function(req, res, next) {
  Flat.find({}).sort({ data: -1 }).exec(function (err, products) {
      if (err) return next(err);
      res.json(products);
  });    
});
//create a flat
router.post('/flat',  (req, res) => {

    var location = req.body.location;
    var street = req.body.street;
    var number = req.body.number;
    var description = req.body.description;
    var Rooms = req.body.Rooms;

  req.checkBody('location', 'Location is required').notEmpty();
  req.checkBody('street', 'Street is required').notEmpty();
  req.checkBody('number', 'Number is required').notEmpty();
  req.checkBody('description').optional();
  req.checkBody('Rooms', 'List of rooms is required').notEmpty();

  let errors = req.validationErrors();

  if (errors){
    console.log(errors);
       }
      else
       {
          let user =  new Flat({
          location,
          street,
          number,
          description,
          Rooms,
          data:Date.now()}).save((err, result)=>{
            if (err) {
              console.log(err);
              return;
            } else {
              console.log(result);
              res.json(result);
            }
          });
        }
      });
//update the flat
      router.put('/flat/:flatId' , UserController.isAuthentic , (req, res) => {
        console.log(req.body);
        const id = req.params.flatId;
        req.checkBody('location').optional();
        req.checkBody('street').optional();;
        req.checkBody('number').optional();
        req.checkBody('description').optional();
        req.checkBody('Rooms').optional();

        let errors = req.validationErrors();
        if (errors){
          console.log(errors);
          res.status(500).json(errors);
        } else {

          let fieldsToChange = {};
          if(req.body.location) fieldsToChange.location = req.body.location;
          if(req.body.street) fieldsToChange.street = req.body.street;
          if(req.body.number) fieldsToChange.number = req.body.number;
          if(req.body.description) fieldsToChange.description = req.body.description;
          if(req.body.Rooms) fieldsToChange.listOfRooms = req.body.Rooms;

          Flat.findByIdAndUpdate(id, {
            $set: fieldsToChange
          }, (err, result) => {
            if(err) {
              res.status(400).json({ success: false, error: err})
            } else {
              res.status(200).json({ success: true, message: "flat sucessfully updated"})
            }
          })
        }
      });

      router.delete('/deleteFlat/:flatId', UserController.isAuthentic, async (req, res) => {
          try {
              var flatId = req.params.flatId;

              await Flat.findByIdAndRemove(flatId);
                  res.json({success: true});
          } catch (err) {
              res.json({success: false, message: "promise err"});
          }
      });

module.exports = router;
