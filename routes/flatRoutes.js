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


/*router.get('/flats', async (req, res)=>{
  await res.send('Get all flats');
});*/


router.post('/flat',  (req, res) => {

  var location = req.body.location;
  var street = req.body.street;
  var number = req.body.number;
  var description = req.body.description;
  var listOfRooms = req.body.listOfRooms;

  req.checkBody('location', 'Location is required').notEmpty();
  req.checkBody('street', 'Street is required').notEmpty();
  req.checkBody('number', 'Number is required').notEmpty();
  req.checkBody('description').optional();
  req.checkBody('listOfRooms', 'List of rooms is required').notEmpty();

  let errors = req.validationErrors();
  if (errors){
    console.log(errors);
       }
      else
       {
         console.log("aaa")
          let user =  new Flat({
          location,
          street,
          number,
          description,
          listOfRooms}).save((err, result)=>{
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

      router.put('/flat/:id',/*isAuthentic, isAdmin,*/ (req, res) => {
        const id = req.params.id;
        req.checkBody('location').optional();
        req.checkBody('street').optional();;
        req.checkBody('number').optional();
        req.checkBody('description').optional();
        req.checkBody('listOfRooms').optional();

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
          if(req.body.listOfRooms) fieldsToChange.listOfRooms = req.body.listOfRooms;


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

module.exports = router;
