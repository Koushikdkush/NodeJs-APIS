const mongoose = require('mongoose');
const moment = require("moment");
const organization = new mongoose.Schema({
    name: {
        type: String
    },
    address: {
        type: String
    },
    created_At: {
        type: Date,
        default: moment(new Date()).format()
    }
});

module.exports = mongoose.model('organization', organization);
