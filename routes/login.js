const express = require('express')
const jwt = require('jsonwebtoken');
const router = express.Router()
const User = require('../models/User')
const Token=require('../models/Token');
const bcrypt = require('bcrypt')

router.get('/',  (req, res) => {
    res.send('We are on Login page')
})

router.post('/', async (req, res) => {
    
    const {email, password} = req.body

    try {
        const searchedUser = await User.findOne({'email' : email})
        if (!searchedUser)
            return res.json({message: 'Incorrect email or password'})
        var isEqual = await bcrypt.compare(password, searchedUser.password)
                // Issue token
        if (isEqual) {
            /*const cur_time=Date.now();
            const payload = {'email':email,'time':cur_time};
    
            const token = jwt.sign(payload, process.env.SECRET, {
                expiresIn: '24h'
            });
    
            const token_item = new Token({ email, cur_time, token });
            
            await token_item.save(function(err) {
                if (err) {
                    res.status(500)
                       .send("Error logging in please try again.");
                } else {
                   res.cookie('token', token, { httpOnly: true })
                      .status(200).send(token);
                }
            });*/
            return res.json(searchedUser)
        }
        return res.json({message: 'Invalid email or password'})
    } catch(err) {
        return res.status(400).json({message: err})
    }
})

module.exports = router