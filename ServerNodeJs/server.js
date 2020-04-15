const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

//Middlewares
app.use(cors())
app.use(bodyParser.json())
/*app.use(express.urlencoded({ extended: true }))
app.use(express.json())*/

//Import Routes
const postsRoute = require('./routes/posts')
app.use('/posts', postsRoute)
//Routes
app.get('/', (req, res) =>{
    res.send('Server is running')
})
//Connect to database
mongoose.connect(process.env.DB_CONNECTION,
{ useNewUrlParser: true, useUnifiedTopology: true },
 () => console.log('connected to DB!'))
app.listen(3000)