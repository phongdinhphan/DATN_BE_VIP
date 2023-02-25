const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    phonenumber: {
        type: String,
        unique: true
    },
    role: String,
    verified: Boolean,
});

const userModel = mongoose.model('Account',UserSchema)
module.exports= userModel;