require('dotenv').config();
const express = require('express');
const http = require('http');
const app = require('./app');
const config = require('./config/index');
const connectMongo = require('./config/mongo');
const io = require('./chat/io');


// init server instance
const server = http.createServer(app);

// connect to services
connectMongo();
io(server);

// start server
server.listen(config.server.port, err => {
  if (err) {
    console.log('server', 'could not start listening', err.message || err);
    process.exit();
  }
  console.log('env', `app starting in "${config.env}" mode...`);
  console.log('server', `Express server is listening on ${config.server.port}...`);
});
