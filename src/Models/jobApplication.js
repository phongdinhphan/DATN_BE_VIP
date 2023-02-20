const mongoose = require('mongoose')

const jobAppSchema = new mongoose.Schema({
    date: {
        type: Date,
        require: true,
    },
    major: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    nameschool: {
        type: String,
        require: true,
    },
    namecompany: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        require: true,
    },
    url: {
        type: Buffer,
        require: true,
    },
    verify: {
        type: Boolean,
        require: true,
    },

});

const jobAppModel = mongoose.model('jobapplication',jobAppSchema)
module.exports= jobAppModel;