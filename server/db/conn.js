const mongoose = require('mongoose')


const connectDB = async () =>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI) 
        console.log("successfully Connected to db");
    } catch (error) {
        console.log("db error: ", error);
    }
}

module.exports = connectDB