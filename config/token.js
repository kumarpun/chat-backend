// const express = require('express');
// const jwt = require('jsonwebtoken');
// const config = require('.');

// const authClientToken = async (req, res, next) => {

//     let token = req.headers['token'];

//     if (!token) {
//         return res.status(401).json({
//             "errors" : [{
//                 "msg" : "No token provided"
//             }]
//         });
//     }

//     jwt.verify(token,config.secret, (err,decoded) => {
//         if(err){
//             return res.status(401).json({
//                 "errors": [{
//                     "msg": "Invalid Token"
//                 }]
//             });
//         }
//         return next();
//     });
// }

// module.exports = {
//     authClientToken : authClientToken
// }