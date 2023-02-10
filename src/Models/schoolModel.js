const mongoose = require('mongoose')

const schoolSchema = new mongoose.Schema({
    nameschool: {
        type: String,
        unique: true,
    },
    emailschool: {
        type:  String,
        unique: true,
    },
    websiteschool: String,
    phoneschool:{
        type:  String,
        unique: true,
    },
    loction: String,
});

const schoolModel = mongoose.model('school',schoolSchema)
module.exports= schoolModel;