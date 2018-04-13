

const MongoClient = require('mongodb').MongoClient;
const dburl = 'mongodb://admin:admin@ds139459.mlab.com:39459/users_of_flatsite';

let _connection = null;

let open = function() {
  MongoClient.connect(dburl, function(err, db) {
    if (err) {
      console.log("DB connection failed");
      return;
    }
    _connection = db;
    console.log("DB connection open");
  });
};

let get = function() {
  return _connection;
};

module.exports = {
  open : open,
  get : get
};
