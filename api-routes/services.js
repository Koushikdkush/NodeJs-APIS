const express = require('express');
const router = express.Router();
const Service = require('../models/services');

router.post('/create', (req, res) => {
    Service.findOne({
        name: req.body.name
    }).exec().then((response) => {
        if (response) {
            res.status(403).json({
                msg: 'Service already exists'
            })
        } else {
            Service.create(req.body).then((resp) => {
                if (resp) {
                    res.status(201).json({
                        message: 'Record Created',
                        record: resp
                    })
                }
            }).catch(err => {
                res.status(500).json({
                    msg: 'Internal Server Error'
                })
            })
        }
    })
})


router.get('/:serviceId', (req, res) => {
    Service.findById({
        _id: req.params.serviceId
    }).exec().then((result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                msg: 'Record not found'
            });
        }
    }).catch(err => {
        res.status(500).json({
            msg: 'Internal Server Error'
        })
    })
});


router.get('/', (req, res) => {
    Service.find().exec().then((resp) => {
        res.status(200).json(resp);
    }).catch(err => {
        res.status(500).json({
            msg: 'Internal Server Error'
        })
    })
})


router.patch('/:serviceId', (req, res) => {
    Service.updateMany({
        _id: req.params.serviceId,
    }, {$set: req.body}).exec().then((response) => {
        res.status(200).json({
            msg: 'Record updated', status: response
        })
    }).catch(err => {
        res.status(500).json('Internal Server error');
    })
});


router.delete('/:serviceId', (req, res) => {
    Service.deleteOne({
        _id: req.params.serviceId,
    }).exec().then((response) => {
        res.status(200).json({
            msg: 'Record deleted',
            status: response
        })
    }).catch(err => {
        res.status(500).json('Internal Server error');
    })
})


module.exports = router;
