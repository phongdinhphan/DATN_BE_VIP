const mongoose = require('mongoose')

const schoolSchema = new mongoose.Schema({
    nameschool: {
        type: String,
        require: true,
    },
    emailschool: {
        type:  String,
        unique: true,
    },
    websiteschool: {
        type:  String,
        unique: true,
    },
    phoneschool:{
        type:  String,
        unique: true,
    },
    location: String,
}, { versionKey: false });

const schoolModel = mongoose.model('school',schoolSchema)
module.exports= schoolModel;