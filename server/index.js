const connectDB = require('./db/conn');
const user = require('./models/userSchema')
const express = require('express')
const  cors = require('cors')
const  cookieParser = require('cookie-parser');
const router = require('./router/auth');
const ReceipeRouter = require('./router/receipeRoute');
require('dotenv').config({path:'./config.env'});
const app = express()
const PORT = process.env.PORT || 5000

// setup Middleware

app.use(cors({
    origin: 'https://receipe-app-sigma.vercel.app',
    
  }));
app.use(cookieParser())
app.use(express.json());

// database 

connectDB()

// routes
app.get('/', (req, res)=>{
    res.send('hello')
})
app.use('/auth',router)
app.use('/receipes',ReceipeRouter)



app.listen(PORT, ()=>{
    console.log(`server is listening at ${PORT}`);
})



// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'https://receipe-app-sigma.vercel.app');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     next();
//   });