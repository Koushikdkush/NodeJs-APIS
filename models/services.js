const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Service', serviceSchema);
