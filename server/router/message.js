const express = require('express');
const { messageModel } = require('../models/messages');
const router = express.Router();

router.post('/history',async (req,res)=>{
    if(req.body.type==0){
        const messages=await messageModel.find({type:0});
        if(messages)
            res.send(messages);
        else
            res.status(404).send({
                msg: '没有信息'
            })
    }else{
        const messages=await messageModel.find({
            type:0,
            friend:{$in:[req.body.friend,req.body.username]},
            username:{$in:[req.body.friend,req.body.username]}
        })
    }
})

module.exports = router;