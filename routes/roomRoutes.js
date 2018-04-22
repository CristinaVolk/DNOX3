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

router.get('/roomAll/:flatId', async (req, res)=>{
  const flatId=req.params.flatId;
  console.log("Get the flat Id: ", flatId);
  Flat
       .findById(flatId)
       .select('Rooms')
        .exec( function(err, doc){
          if (err){
            console.log(err);
            res
               .status(500)
               .json(err);
          } else {
            console.log('Returned socks', doc)
                res
                  .status(200)
                  .json(doc.Rooms);
              };
});
});

let AddRoom = (req, res, flat)=>{
  console.log('bla bla');
  flat.Rooms.push({
    title:req.body.title,
    number:req.body.number,
    description:req.body.description,
    price:req.body.price,
    number_of_rooms:req.body.number_of_rooms,
    number_of_free_rooms:req.body.number_of_free_rooms
  });
  flat.save((err, flatUpdated) => {
    if (err){
      console.log(err);
      res.json(err);
    }else{
      res.status(200).json(flatUpdated.Rooms[flatUpdated.Rooms.length-1]);
    }
  })
}

router.post('/addRoom/:flatId', (req, res)=>{
  const flatId = req.params.flatId;
  console.log("Get the room Id: ", flatId);
  Flat.findById(flatId)
      .select('Rooms')
      .exec((err, flat)=>{
        if(err){
          console.log(err);
          res.status(500).json(err);
        }else if(!flat){
          res.status(404).json("Error finding the flat");
        }
        if(flat){
          AddRoom(req, res, flat);
        } else {
          res.json("Error adding room");
        }
      });
});


router.delete('/deleteRoom/:flatId/:roomId', (req, res)=>{
  const flatId=req.params.flatId;
  const roomId=req.params.roomId;
  var ReviewID;
  console.log('GET the flatId давай по одному бля', flatId);
  Flat
       .findById(flatId)
       .select('Rooms')
        .exec( function(err, flat){ //var review = hotel.reviews.id(reviewId);
          if(err) {
            console.log("Error finding flat by Id");
            res.status(404).json(err);
          }
          else if (!flat) {
            console.log("Error finding hotel");
            res.status(404).json({"message" : "Hotel ID is not found in database "});
          }
          if (flat){
            RoomID = flat.Rooms.id(roomId);
            console.log(RoomID);
            if(!RoomID){
              res
                .status(500)
                .json("success:false");
            }  else{
              flat.Rooms.id(roomId).remove();
              flat.save((err, roomUpdated)=>{
                if(err){
                  res.status(500)
                  .json(err);
                } else {
                  res.status(200)
                  .json(roomUpdated);
                }
              });
            };
          }
        });
      })

module.exports = router;
