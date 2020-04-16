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

router.post('delFriend',async (req,res)=>{
    res.send('del');
})

module.exports = router;