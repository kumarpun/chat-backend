const mongoose = require('mongoose');
const Promise = require('bluebird');
const config = require('./index');
const log = require('../log');


mongoose.Promise = Promise; // plug-in bluebird as mongoose Promise

// to export: init mongo connection, set logging
const init = () => {
  connectMongo();
  mongoose.connection.on('connected', () => log.log('mongo', `connected to db: "${config.mongo.host}"`));
  mongoose.connection.on('error', err => log.err('mongo', 'error', err.message || err));
};


// connect to mongo host, set retry on initial fail
const connectMongo = () => {
    var mongodbUri = "mongodb+srv://kumarpun:jimin@1234@cluster0-83sos.mongodb.net/video?retryWrites=true&w=majority"
    var settings = {
          reconnectTries : Number.MAX_VALUE,
          autoReconnect : true,
          useNewUrlParser: true,

    };
    mongoose.connect(mongodbUri, settings, function(err, dbref) {
      if (!err) {
        console.log("Mongodb connected");
        db = dbref;
      }else{
        console.log("Error while connecting to mongoDB" + err);
      }
    });
}

module.exports = init;
