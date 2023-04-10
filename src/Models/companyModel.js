const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    namecompany:{
        type: String,
        unique: true,
    },
    emailcompany:  {
        type: String,
        unique: true,
    },
    websitecompany:  {
        type: String,
        unique: true,
    },
    phonecompany: {
        type: String,
        unique: true,
    },
    introduce: {
        type: String,
        require: true,
        maxlength: 1500,
    },
    slogan: {
        type: String,
        require: true,
    },
    logo: {
        type: String,
        require: true,
    },
    location: {
        type: String,
        require: true,
    },
}, { versionKey: false });

const companyModel = mongoose.model('company',companySchema)
module.exports= companyModel;