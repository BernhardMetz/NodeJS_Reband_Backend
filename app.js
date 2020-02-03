const express=require('express')
const mongoose = require('mongoose')
require('dotenv/config')

const loginRoute = require('./routes/login')

const app = express()
app.use('/api/login', loginRoute)
app.use(express.json())

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, (err) => {
    if (err) throw err
    else console.log(`Successfully connected to ${mongo_uri}`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)