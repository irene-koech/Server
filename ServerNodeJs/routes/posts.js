const express = require('express')
const router = express.Router()
const Totals = require('../models/Totals')
const Vote = require('../models/Vote')
const Booking = require('../models/Booking')
const Title = 'Total bookings and votes'

//Get Totals 
router.get('/', async (req, res) => {
    try {
        var totals = await Totals.find({ title: Title }, a => {

        })
        if (totals.length == 0) {
            await init(res)
        }
        else {
            res.json(totals[0])
        }
    } catch (err) {
        res.json({ message: err })
    }
})

// Vote
router.post('/vote', async (req, res) => {
    const vote = new Vote({

        userID: req.body.userID,
        period: req.body.period,
        vote: req.body.vote
    })

    const oldVote = await Vote.findOne({ userID: vote.userID }, (err, res) => {
    })

    if (oldVote) {
        if (oldVote.period == 'AM') {
            if (oldVote.vote == 'Like') {
                await Totals.findOneAndUpdate({ title: Title }, { $inc: { AMlikeCounter: -1 } })
            }
            else {
                await Totals.findOneAndUpdate({ title: Title }, { $inc: { AMdisLikeCounter: -1 } })
            }
        }
        else {
            if (oldVote.vote == 'Like') {
                await Totals.findOneAndUpdate({ title: Title }, { $inc: { PMlikeCounter: -1 } })
            }
            else {
                await Totals.findOneAndUpdate({ title: Title }, { $inc: { PMdisLikeCounter: -1 } })
            }
        }
    }
    Vote.deleteMany({ userID: vote.userID }, (err, status) => {
    })

    try {

        const savedPost = await vote.save()
        const totals = await Totals.find()
        if (req.body.period == 'AM') {
            if (req.body.vote == 'Like') {
                await Totals.findOneAndUpdate({ title: Title }, { $inc: { AMlikeCounter: 1 } })
            }
            else {
                await Totals.findOneAndUpdate({ title: Title }, { $inc: { AMdisLikeCounter: 1 } })
            }
        }
        else {
            if (req.body.vote == 'Like') {
                await Totals.findOneAndUpdate({ title: Title }, { $inc: { PMlikeCounter: 1 } })
            }
            else {
                await Totals.findOneAndUpdate({ title: Title }, { $inc: { PMdisLikeCounter: 1 } })
            }
        }

        res.json(savedPost)
    } catch (err) {
        res.json({ message: err })
    }
})

//Get Votes 
router.get('/vote', async (req, res) => {
    try {
        const votes = await Vote.find()
        res.json(votes)
    } catch (err) {
        res.json({ message: err })
    }
})

//Get a specific vote
router.get('/vote/:userID', async (req, res) => {
    try {
        const post = await Vote.findOne({ userID: req.params.userID }, a => { })
        res.json(post)
    } catch (err) {
        res.json({ message: err })
    }
})

// Book
router.post('/book', async (req, res) => {
    const booking = new Booking({
        userID: req.body.userID,
        period: req.body.period,
    })

    const oldBooking = await Booking.findOne({ userID: booking.userID }, (err, res) => {
    })

    if (oldBooking) {
        if (oldBooking.period == 'AM') {
            await Totals.findOneAndUpdate({ title: Title }, { $inc: { amCounter: -1 } })
        }
        else {
            await Totals.findOneAndUpdate({ title: Title }, { $inc: { pmCounter: -1 } })
        }
    }
    Booking.deleteMany({ userID: booking.userID }, (err, status) => {
    })

    try {
        const savedPost = await booking.save()
        const totals = await Totals.find()
        if (req.body.period == 'AM') {
            await Totals.findOneAndUpdate({ title: Title }, { $inc: { amCounter: 1 } })
        }
        else {
            await Totals.findOneAndUpdate({ title: Title }, { $inc: { pmCounter: 1 } })
        }


        res.json(savedPost)
    } catch (err) {
        res.json({ message: err })
    }
})

//Get Bookings 
router.get('/book', async (req, res) => {
    try {
        const bookings = await Booking.find()
        res.json(bookings)
    } catch (err) {
        res.json({ message: err })
    }
})

//Get a specific booking
router.get('/book/:userID', async (req, res) => {
    try {
        const post = await Booking.findOne({ userID: req.params.userID }, a => { })
        res.json(post)
    } catch (err) {
        res.json({ message: err })
    }
})

// Wipe everything
router.delete('/wipe', async (req, res) => {
    try {
        Totals.deleteMany({}, a => {

        })
        Vote.deleteMany({}, a => {

        })
        Booking.deleteMany({}, a => {

        })
        res('All clean now')
    } catch (err) {
        res.json({ message: err })
    }
})

async function init(res) {
    const post = new Totals({

        title: Title,
        amCounter: 0,
        pmCounter: 0,
        AMlikeCounter: 0,
        AMdisLikeCounter: 0,
        PMlikeCounter: 0,
        PMdisLikeCounter: 0

    })

    try {
        const savedPost = await post.save()
        res.json(savedPost)
    } catch (err) {
        res.json({ message: err })
    }
}

module.exports = router