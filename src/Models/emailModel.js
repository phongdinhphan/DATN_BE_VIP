const mongoose = require('mongoose')

const emailSchema = new mongoose.Schema({
    fromemail:{
        type: String,
        require: true,
    },
    toemail:  {
        type: String,
        require: true,
    },
    subject: String,
    content: {
        type: String,
        require: true,
    },
}, { versionKey: false });

const emailModel = mongoose.model('email',emailSchema)
module.exports= emailModel;