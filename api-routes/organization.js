const express = require("express");
const router = express.Router();
const Organization = require('../models/organization');

router.post('/create', async (req, res) => {
    Organization.findOne({
        name: req.body.name
    }).exec().then(response => {
        if (response) {
            res.status(403).json({msg: 'Organization already exists'})
        } else {
            Organization.create(req.body).then(result => {
                res.status(201).json(result);
            }).catch(err => {
                res.status(500).json({error: 'Internal Server Error'});
            })
        }
    });
});

router.patch('/:orgId', async (req, res) => {
    Organization.updateMany({_id: req.params.orgId}, {
        $set: req.body
    }).exec().then(result => {
        res.status(200).json({result: result, msg: 'Record updated'})
    }).catch(err => {
        res.status(500).json({result: err, msg: 'Updation failed'})
    })
})


module.exports = router;
