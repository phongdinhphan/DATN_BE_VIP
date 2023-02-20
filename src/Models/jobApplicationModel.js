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
    nameapp: {
        type: String,
        require: true,
    },
    nameappli: {
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