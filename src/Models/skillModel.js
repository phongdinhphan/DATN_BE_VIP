const mongoose = require('mongoose')

const skillSchema = new mongoose.Schema({
    nameskill: {
        type: String,
        unique: true,
    },
});

const skillModel = mongoose.model('skill',skillSchema)
module.exports= skillModel;