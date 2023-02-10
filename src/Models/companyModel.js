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
    websitecompany: String,
    phonecompany: {
        type: String,
        unique: true,
    },
});

const companyModel = mongoose.model('company',companySchema)
module.exports= companyModel;