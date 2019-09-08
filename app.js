const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const config = require('./config');

// import routes
const userRoutes = require('./routes/users');
const messageRoutes = require('./routes/message');
const meetingRoutes = require('./routes/meeting_routes');
const emailRoutes = require('./email');
// initialize the app
const app = express();

// middleware
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
require('./config/passport')(passport);

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// set routes
app.use(`${config.root}/users`, userRoutes);
app.use(`${config.root}/messages`, messageRoutes);
app.use(`${config.root}/meetings`, meetingRoutes);
app.use(`${config.root}/email`, emailRoutes);


module.exports = app;
