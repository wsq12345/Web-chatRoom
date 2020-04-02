const express = require('express');
const { messageModel } = require('../models/messages');
const router = express.Router();

router.get('/history',async (req,res)=>{
    const messages=await messageModel.find();
    if(messages)
        res.send(messages);
    else
        res.status(404).send({
            msg: '没有信息'
        })
})

module.exports = router;