const express=require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

const loginRoute = require('./routes/login')
const registerRoute = require('./routes/register')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/api/login', loginRoute)
app.use('/api/user', registerRoute)

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, (err) => {
    if (err) throw err
    else console.log(`Successfully connected to ${process.env.DB_CONNECTION}`)
})
mongoose.set('useFindAndModify', false);

const PORT = process.env.PORT || 3001
app.listen(PORT)