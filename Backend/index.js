const express =require('express')
const bodayParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = express()
dotenv.config()

app.use(express.json())

const UserRoutes = require('./routes/user');

// Express APIs
const Auth = require('./routes/auth')
const Product = require('./routes/product')
const Order = require('./routes/order')



mongoose.set('strictQuery', true);

mongoose
  .connect(process.env.MONGO_URL)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })

app.use(cors());

app.use(bodayParser.json())

app.use(cookieParser())

app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200']
}))

app.use('/auth', Auth)
app.use('/products', Product)
app.use('/order', Order)



app.listen(process.env.PORT,()=>{
    console.log("Backend is running")
});