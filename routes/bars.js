const 
    express = require('express'),
    barsRouter = new express.Router(),
    Bar = require('../models/Bar.js'),
    { verifyToken } = require('../serverAuth.js') 


barsRouter.get('/', (req, res) => {
    //.populate gives us access to the whole user object, not just the id
    Bar.find({}).populate('user').exec((err, bars) => {
        res.json(bars)
    })
})

// ensures that by the time you get to that action, req.user is available
barsRouter.use(verifyToken)

barsRouter.post('/', (req, res)=> {
    console.log(req.user)
    // .create builds the bar object and saves to db in one command
    // includes all fields from form plus a user key, which is the current user
    Bar.create({...req.body, user: req.user}, (err, bar) => {
        res.json({ success: true, message: "bar created", bar: bar})

    })
})

module.exports = barsRouter

