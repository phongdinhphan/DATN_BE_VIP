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
    skill:{
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
    filename:{
        type: String,
        unique: true,
    },
}, { versionKey: false });

const jobpostModel = mongoose.model('jobpost',JobPostSchema)
module.exports= jobpostModel;