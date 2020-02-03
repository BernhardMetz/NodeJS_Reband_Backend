const express=require('express')
const app = express()
const mongoose = require('mongoose')
const mongo_uri = 'mongodb://localhost/rebrand';

mongoose.connect(mongo_uri, {useNewUrlParser: true}, (err) => {
    if (err) throw err
    else console.log(`Successfully connected to ${mongo_uri}`)
})