const mongoose = require('mongoose')

const areasSchema = new mongoose.Schema({
    code: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
}, { versionKey: false });

const areasModel = mongoose.model('areas',areasSchema)
module.exports= areasModel;