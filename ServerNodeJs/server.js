const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
var PORT =process.env.PORT || 3000
var DB_URL = process.env.MONGODB_URI || 'mongodb://localhost/posts'
require('dotenv/config')

//Middlewares
//app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Import Routes
const postsRoute = require('./routes/posts')
app.use('/posts', postsRoute)
app.get('/', (req, res) =>{
    res.send('Home Page')
})

//Connect to database
mongoose.connect(DB_URL,
{ useNewUrlParser: true, useUnifiedTopology: true,  useFindAndModify: false },
 () => console.log('connected to DB!'))

 //Listen to Port 3000
 app.listen(PORT, () =>{
     console.log(`Listening on port ${PORT}`)
 })