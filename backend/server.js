const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const colors = require('colors')
const connectDB = require('./config/db')

connectDB()

const app = express()

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
     
// parse application/json
app.use(express.json())

app.use('/api/movies', require('./routes/movieRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.listen(port, () => {console.log(`Server started on ${port}`)})
