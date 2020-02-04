const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

  
UserSchema.methods.isCorrectPassword = async (password) => {
    const hash = await bcrypt.hash(password, 10)
    await bcrypt.compare(password, hash)
}

module.exports = mongoose.model('User', UserSchema)