const mongoose = require('mongoose')


const JobPostSchema = new mongoose.Schema({
    benefit:{
        type: String,
        require: true,
    },
    expdate:{
        type: Date,
        require: true,
    },
    gender:{
        type: String,
        require: true,
    },
    location:{
        type: String,
        require: true,
    },
    namecompany:{
        type: String,
        require: true,
    },
    title:{
        type: String,
        require: true,
    },
    required:{
        type: String,
        require: true,
    },
    salary:{
        type: String,
        require: true,
    },
    logo:{
        type: String,
        require: true,
    },
});

const jobpostModel = mongoose.model('jobpost',JobPostSchema)
module.exports= jobpostModel;