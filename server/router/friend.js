const express = require('express');
const { friendModel } = require('../models/friends');
const { UserModel } = require('../models/users');
const router = express.Router();

router.post('/searchFriend',async (req,res)=>{
    //console.log(req.body.friend)
    let reg = new RegExp(req.body.friend);
    let friendExist = await UserModel.find({
        username:reg
    },{username:1,picUrl:1})
    if(friendExist){
        return res.send(friendExist);
    }
    res.status(404).send({msg:'搜索不到'})
})


router.post('/addFriend',async (req,res)=>{
    if(req.body.username==req.body.friend)
        return res.status(502).send({msg:'无法添加自己'});
    let friend = await friendModel.findOne({
        username: req.body.username,
        friend: req.body.friend,
        status: 1
    })
    if(friend){
        return res.status(502).send({msg:'已经添加该好友'});
    }
    if(req.body.status==0){
        await friendModel.create({ //暂存好友请求
            username: req.body.username,
            friend: req.body.friend,
            status: req.body.status
        })
        return res.send({msg:'好友请求已发送'});
    }
    if(req.body.status==1){ //接受请求并存入数据
        await friendModel.create({ //2个人的好友信息存入
            username: req.body.username,
            friend: req.body.friend,
            status:req.body.status
        })
        await friendModel.create({
            username: req.body.friend,
            friend: req.body.username,
            status:req.body.status
        })
        await friendModel.remove({
            username: req.body.friend,
            friend: req.body.username,
            status: 0
        })
        return res.send({msg:'申请已接受'});
    }
    if(req.body.status==-1){ //删除好友请求
        await friendModel.remove({
            username: req.body.friend,
            friend: req.body.username,
            status: 0
        })
        return res.send({msg:'已拒绝'});
    }
    
})

router.post('/delFriend',async (req,res)=>{
    if(req.body.username==req.body.friend)
        return res.status(502).send({msg:'无法对自己进行操作'});
    let friend = await friendModel.findOne({
        username: req.body.username,
        friend: req.body.friend,
        status: 1
    })
    if(friend){
        await friendModel.remove({ //删除2条记录
            username: {$in:[req.body.friend,req.body.username]},
            friend: {$in:[req.body.friend,req.body.username]},
            status: 1
        })
        res.send({msg:'您已删除此好友'})
    }else{
        res.status(502).send({msg:'您未添加该用户'});
    }
})

router.post('/getFriendList',async (req,res)=>{
    let friendList = await friendModel.find({
        $or:[{$and:[{username:req.body.username},{status:1}]},{$and:[{friend:req.body.username},{status:0}]}]
    })
    if(friendList){
        return res.send(friendList);
    }
    res.status(404).send({msg:'您未添加好友'})
})

module.exports = router;