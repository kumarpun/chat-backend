const express = require('express');
const router = express.Router();
const passport = require('passport');
const debug = require('util').debuglog('app');
const meetModule = require('../models/meet');
var mongoose = require('mongoose');
Meet = mongoose.model('Meet')

// Book a meeting

router.post('/book/:id', (req, res, next) => {
    console.log(req.params);
        Meet.findOneAndUpdate({_id:req.params.id},
            {$set: { booked: true}}, {new: true}, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                }
            
                console.log(doc);
                res.send(doc);
            });
});

// create a meeting

router.post('/create', passport.authenticate("jwt", {session:false}), (req, res, next) => {
    let response = {success: true};

    let { id, start, end, booked, patientID, doctorID  } = req.body;

    try {
        let data = meetModule.create({
            start: start,
            end: end,
            booked: false,
            patientID: patientID,
            doctorID: doctorID
        });
        if(!data) {
            response.success = false;
            response.msg = "unable to create meeting";
            res.json(response);
            throw new error();
        }
        return res.status(201).json({
            "success": [{
                "msg": "meeting created successfully"
            }]
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json(
            {
            "errors": [{
                "msg": "problem creating new meeeting"
            }]
        });
    }

});

// get all meetings

router.get('/create', passport.authenticate("jwt", {session: false}), (req, res) => {
    let response = {success: true};
    Meet.find({}, function(err, meet) {
        if(err) {
            response.success = false;
            response.msg = "there was an error on getting meeting";
            res.json(response);
        } else {
            response.msg = "meeting retrieved successfully";
            response.meet = meet;
            res.json(response);
        }
    })
});

// get meetings by id

router.get('/:id', (req, res, next) => {
    Meet.findById(req.params.id, function(err, meet) {
        if (err) return next(err);
        res.json(meet);
       })
})

module.exports = router;