const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contestSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    prize: {
        type: Number,
        required: true,
    },
    deadline: {
        type: Date,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Contest', contestSchema);