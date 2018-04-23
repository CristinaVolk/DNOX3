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

router.get('/roomAll/:flatId', UserController.isAuthentic, async (req, res)=>{
  try{
    var flatId = req.params.flatId;
    let flat = await Flat.findById(flatId).select('Rooms');
    if(!flat) res.json({success: false, message: "couldn't find the flat by its id"});
    else res.json(flat.Rooms);
      }  catch (err) {
          res.json({success: false, message: "promise err"});
      }
});

let AddRoom = (req, res, flat)=>{
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

router.post('/addRoom/:flatId', UserController.isAuthentic, async (req, res)=>{
  try{
    var flatId = req.params.flatId;
    let flat = await Flat.findById(flatId);
    if(!flat) res.json({success: false, message: "couldn't find the flat by its id"});
    else AddRoom(req, res, flat);
      }  catch (err) {
          res.json({success: false, message: "promise err"});
      }
});

router.put('/updateRoom/:flatId/:roomId',UserController.isAuthentic, async (req, res) => {
    try {
        var flatId = req.params.flatId;
        var roomId = req.params.roomId;

        var title = req.body.title;
        var number = req.body.number;
        var description = req.body.description;
        var price = req.body.price;
        var number_of_rooms = req.body.number_of_rooms;
        var number_of_free_rooms = req.body.number_of_free_rooms;

        req.checkBody('title').optional();
        req.checkBody('number').optional();
        req.checkBody('description').optional();
        req.checkBody('price').optional();
        req.checkBody('number_of_rooms').optional();
        req.checkBody('number_of_free_rooms').optional();

        let errors = await req.validationErrors();

        let flat = await Flat.findById(flatId);
         if(!flat) {
           res.json({success: false, message: "couldn't find the flat by its id"});
       } else {
           let Room=flat.Rooms.id(roomId);
           if(!Room) res.json({success: false, message: "couldn't find the flat by its id"});
        else {
             Room.title=title;
             Room.number=number;
             Room.description=description;
             Room.price=price;
             Room.number_of_rooms=number_of_rooms;
             Room.number_of_free_rooms=number_of_free_rooms;
             flat.Rooms.forEach(function(item, i,arr){
               console.log(flat.Rooms[i]);
             });
             flat.save(function(err, roomUpdated){
               if(err){
                 res.status(500)
                 .json(err);
               } else {
                 roomUpdated.Rooms.forEach(function(item, i,arr){
                   console.log(flat.Rooms[i]);
                 });
                 res.status(200)
                 .json(roomUpdated.Rooms[roomUpdated.Rooms.length-1]);
               }
             });
    }
  }
} catch (err) {
        res.json({success: false, message: "promise err"});
    }
});

      router.delete('/deleteRoom/:flatId/:roomId', UserController.isAuthentic, async (req, res) => {
          try {
              var flatId = req.params.flatId;
              var roomId = req.params.roomId;

              let flat = await Flat.findById(flatId);
              if(!flat) res.json({success: false, message: "couldn't find the flat by its id"});
                  await Flat.findByIdAndUpdate(flatId, {
                      $pull:{
                          "Rooms.id": roomId
                      }
                  });
                  res.json({success: true});
          } catch (err) {
              res.json({success: false, message: "promise err"});
          }
      });

module.exports = router;
