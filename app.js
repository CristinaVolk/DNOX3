const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

const databaseController = require('./controllers/databaseController');
databaseController.open();

const book = require('./routes/book');
const flatRoutes = require('./routes/flatRoutes');
<<<<<<< HEAD
=======
const roomRoutes = require('./routes/roomRoutes');
>>>>>>> master

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/books', express.static(path.join(__dirname, 'dist')));
app.use('/', book);
app.use('/', flatRoutes);
<<<<<<< HEAD
=======
app.use('/', roomRoutes);
>>>>>>> master
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) { //haha :P this allways throw an error
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.json('error!');
});


module.exports = app;
