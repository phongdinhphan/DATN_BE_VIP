
const mongoose = require('mongoose')
mongoose.set('strictQuery', true);

async function connectDB (){
    try {
        await mongoose.connect(`mongodb://127.0.0.1:${process.env.Port_Mogoose}/${process.env.DB_Name}`)
        console.log("Connect DB success");
    } catch (error) {
        console.log("Connect DB fail",error);
    }
}

module.exports = connectDB;