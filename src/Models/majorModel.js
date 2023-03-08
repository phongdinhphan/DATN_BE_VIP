const mongoose = require('mongoose')

const majorSchema = new mongoose.Schema({
    namemajor: {
        type: String,
        unique: true,
    },
}, { versionKey: false });

const majorModel = mongoose.model('major',majorSchema)
module.exports= majorModel;