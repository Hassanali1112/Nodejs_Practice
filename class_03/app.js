const express = require("express")
const rateLimiter = require("express-rate-limit")
const userRoutes = require('./routes/users')
require("dotenv").config();


const app = express()

const limiter = rateLimiter(
  {
    windowMs : 1 * 60 * 1000,
    limit : 2,
  }
)

app.use(limiter)
app.use(express.json())
app.use('/users', userRoutes)


app.listen(process.env.port,()=>{
  console.log(`server is here at port ${process.env.port}`);
})