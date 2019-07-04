const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');

// register
router.post('/register', (req, res, next) => {
    let response = { success: false};
    if (!(req.body.password == req.body.confirmPass)) {
        let err = " The password don't match";
        return next(err);
    } else {
        let newUser = new User({
            username: req.body.username,
            password: req.body.password,
        });

        User.addUser(newUser, (err, user) => {
            if (err) {
                response.msg = err.msg || 'Failed to register user';
                res.json(response);
            } else {
                response.success = true;
                response.msg = 'User registered successfully';
                response.user = {
                    id: user._id,
                    username: user.username,
                };
                console.log('user registered successfullly', user.username);
                res.json(response);
            }
        })
    }
})

router.post('/authenticate', (req, res, next) => {
    let body = req.body;
    let response = { success: false };

    User.authenticate(body.username.trim(), body.password.trim(), (err, user) => {
        if (err) {
            response.msg = err.msg;
            res.json(response);
        } else {
            //create unique token for user
            let signData = {
                id: user._id,
                username: user.username,
              };
              let token = jwt.sign(signData, config.secret, {
                expiresIn: 6048000000000000,
              });
            response.token = 'JWT ' + token;
            response.user = signData;
            response.success = true;
            response.msg = 'User authenticated successfully';

            console.log('user authenticated successfully', user.username);
            res.json(response);
        }
    });
});
// profile
router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    let response = { success: true };
    response.msg = 'Profile retrieved successfuly';
    response.user = req.user;
    res.json(response);
  }
);

// user list
router.get('/', (req, res, next) => {
  User.getUsers()
    .then(users => {
      let response = {
        success: true,
        users: users,
      };
      return res.json(response);
    })
    .catch(err => {
      log.err('mongo', 'failed to get users', err.message || err);
      return next(new Error('Failed to get users'));
    });
});

module.exports = router;
