const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    Email: {
        type: String,
        require: true,
    },
    EmailCom: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    Title: {
        type: String,
        require: true,
    },
    DateCommit: {
        type: Date,
        require: true,
    },

}, { versionKey: false });

const reportModel = mongoose.model('report',reportSchema)
module.exports= reportModel;