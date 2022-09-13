
// setting up environmental variables
require('dotenv').config()

// setting up express app
const express = require('express')
const app = express()

// setting up mongoose connection
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const apiRoutes = require('./routes/apiRoutes')
app.use('/api', apiRoutes)

app.listen(4000, () => {
    console.log('Server listening on port 4000...')
})