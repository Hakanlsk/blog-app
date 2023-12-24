const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const connectDB = require('./config/db')

//DOTENV
dotenv.config()

//MONGODB CONNECTION
connectDB();

//REST OBJECT   //express uygulamasını başlatır
const app = express()

//middlewares
//cors Cross-Origin Resource Sharing'i etkinleştirir, farklı kaynaklardan gelen isteklere izin verir
//express.json(): Gelen isteklerdeki JSON verilerini işlemek için Express'in yerleşik bir middleware'ini kullanır.
//morgan('dev'): HTTP isteklerini terminalde göstermek için bir HTTP istek günlüğü ortamı oluşturur.
app.use(cors()) 
app.use(express.json())
app.use(morgan('dev'))

//ROUTES
app.use('/api/v1/auth', require('./routes/userRoutes'))

//PORT  //uygulamanın hangi portta çalışacağı belirlenir
const PORT = process.env.PORT || 8080

//listen //uygulamanın hangi porta bağlandığı gösterilir
app.listen(PORT, () => {
    console.log(`Server Running ${PORT}`.bgGreen.white)
})