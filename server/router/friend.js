const express = require('express');
const { friendModel } = require('../models/friends');
const { UserModel } = require('../models/users');
const router = express.Router();

router.post('/searchFriend',async (req,res)=>{
    //console.log(req.body.friend)
    let reg = new RegExp(req.body.friend);
    let friendExist = await UserModel.find({
        username:reg
    })
    if(friendExist.length){
        return res.send(friendExist);
    }
    res.status(404).send({msg:'搜索不到'})
})

router.post('/addFriend',async (req,res)=>{
    res.send('add');
})

router.post('delFriend',async (req,res)=>{
    res.send('del');
})

module.exports = router;