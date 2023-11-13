const mongoose = require('mongoose');
const moment = require('moment');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    organization: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'organization',
        default: []
    }],
    crated_at: {
        type: Date,
        default: moment(new Date()).format()
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
