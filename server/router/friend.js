const express = require('express');
const { friendModel } = require('../models/friends');
const router = express.Router();

router.post('/searchFriend',async (req,res)=>{
    res.send('search');
})

router.post('/addFriend',async (req,res)=>{
    res.send('add');
})

router.post('delFriend',async (req,res)=>{
    res.send('del');
})

module.exports = router;