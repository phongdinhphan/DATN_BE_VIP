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
    responsibility:{
        type: String,
        require: true,
    },
    verify:{
        type: Boolean,
        require: true,
    },
    major:{
        type: String,
        require: true,
    },
    DateSubmitted:{
        type: Date,
        require: true,
    },
    workingform:{
        type: String,
        require: true,
    },
    place:{
        type: String,
        require: true,
    },
 
}, { versionKey: false });

const jobpostModel = mongoose.model('jobpost',JobPostSchema)
module.exports= jobpostModel;