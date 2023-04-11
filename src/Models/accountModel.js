const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        unique: true
    },
    phonenumber: {
        type: String,
        unique: true
    },
    password: String,
    
    role: String,
    verified: Boolean,
}, { versionKey: false });

const userModel = mongoose.model('Account',UserSchema)
module.exports= userModel;