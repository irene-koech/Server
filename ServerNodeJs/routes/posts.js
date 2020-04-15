const express = require('express')
const router = express.Router()
const User = require('../models/User')

//Get all 
router.get('/', async (req, res) =>{
    res.send('done')
    try{
        const posts = await User.find()
        res.json(posts)
    }catch(err){
        res.json({ message: err })
    }
})
//Submit a post
router.post('/', async (req, res) => {
    const post = new User({
        am: req.body.am,
        pm: req.body.pm,
        like: req.body.like,
        dislike: req.body.dislike
    })
  
   try{
        const savedPost = await post.save()
        res.json(savedPost)
        console.log(res.json(savedPost)
        )
    }catch(err){
        res.json({ message: err})
    }
})
//Get a specific post
router.get('/:postId', async (req, res) =>{
    try{
        const post = await Post.findById(req.params.postId)
        res.json(post)
    }catch(err){
        res.json({ message: err})
    }
})
// Delete
router.delete('/postId', async (req, res) => {
    try{
        const removedPost = await Post.remove({_id: req.params.postId})
        res.json(removedPost)
    }catch(err){
        res.json({ message: err})
    }

})
//Update a post
router.patch('/postId', async (req, res) => {
    try{
        const updatedPost = await Post.updateOne(
            {_id: req.params.postId}, 
            {$set: {title: req.body.title}})
        res.json(updatedPost)
    }catch(err){
        res.json({ message: err})
    }

})

module.exports = router