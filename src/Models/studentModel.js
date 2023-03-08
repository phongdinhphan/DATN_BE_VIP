const mongoose = require('mongoose')


const StudentSchema = new mongoose.Schema({
    studentname:{
        type: String,
        require: true,
    },
    studentemail: {
        type: String,
        unique: true
    },
    studentphone: {
        type: String,
        unique: true
    },
    academicyear: {
        type : String,
        require: true,
    },
    address: {
        type : String,
        require: true,
    },
    code: {
        type : Number,
        require: true,
    },
    gender:{
        type : String,
        require: true,
    },
    major:{
        type : String,
        require: true,
    },
    school:{
        type : String,
        require: true,
    },
    verify:{
        type : Boolean,
        require: true,
    },
    
}, { versionKey: false });

const studentModel = mongoose.model('student',StudentSchema)
module.exports= studentModel;