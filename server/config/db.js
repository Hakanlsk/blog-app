const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL_LOCAL)
        console.log(`Connected to DATABASE ${mongoose.connection.host}`.bgCyan.white)
    } catch (error) {
        console.log(`error in connectionDB ${error}`.bgRed.white)
    }
}

module.exports = connectDB;