const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/',  (req, res) => {
    res.send('We are on Login page')
})

router.post('/', async (req, res) => {
    
    const {email, password} = req.body

    try {
        const searchedUser = await User.findOne({'email' : email}, (err, user) => {
            if (err) {
                console.error(err);
                res.status(500)
                  .json({
                  error: 'Internal error please try again'
                });
            } else if (!user) {
                res.status(401)
                    .json({
                        error: 'Incorrect email or password'
                    });
            } else {
                user.isCorrectPassword(password, function(err, same) {
                    if (err) {
                        console.error(err);
                        res.status(500)
                            .json({
                                error: 'Internal error please try again'
                            });
                    } else if (!same) {
                        res.status(401)
                            .json({
                                error: 'Incorrect email or password'
                            });
                    } else {
                        // Issue token
          
                        const cur_time=Date.now();
                        const payload = {'email':email,'time':cur_time};
                        console.log(email);
                
                
                        const token = jwt.sign(payload, process.env.SECRET, {
                            expiresIn: '1h'
                        });
                
                        const token_item = new Token({ email,cur_time,token });
                      
                        token_item.save(function(err) {
                            if (err) {
                                console.log(err);
                                res.status(500)
                                    .send("Error logging in please try again.");
                            } else {
                                res.cookie('token', token, { httpOnly: true })
                                    .status(200).send(token);
                            }
                        });
                    }
                });
            }
        })
        res.send(searchedUser)
    } catch(err) {
        res.status(400).send({message: err})
    }
})

module.exports = router