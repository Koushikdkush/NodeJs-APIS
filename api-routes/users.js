const express = require('express');
const router = express.Router();
const User = require('../models/users');
const moment = require("moment");
const multer = require('multer');
const path = require('path');

// Create a new user
router.post('/create', async (req, res) => {
    try {

        User.findOne({
            email: req.body.email,
            dateOfBirth: req.body.dateOfBirth
        }).exec().then((async response => {
            if (response) {
                res.status(403).json({msg: 'User Already Exists'});
            } else {
                const user = await User.create(req.body);
                res.status(201).json(user);
            }
        }))

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users.filter(user => {
            return user.status;
        }));
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// get specific user
router.get('/:userId', async (req, res) => {
    try {
        await User.findById(req.params.userId).select('name email dateOfBirth')
            .populate('organization')
            .exec().then((response) => {
                if (response) {
                    res.status(200).json(response);
                } else {
                    res.status(404).json({msg: 'User not found!'});
                }
            });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


router.patch('/:userId', async (req, res) => {
    try {
        User.updateMany(
            {_id: req.params.userId}, {$set: req.body}
        ).exec().then(response => {
            res.status(200).json(response);
        })
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


router.delete('/:userId', async (req, res) => {
    try {
        User.deleteMany({_id: req.params.userId}).exec().then(response => {
            res.status(200).json({result: response, msg: 'User Deleted'});
        }).catch(err => {
            res.status(500).json(err);
        })
    } catch (error) {

    }
})

module.exports = router;
