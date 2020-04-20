const express = require('express');
const { UserModel } = require('../models/users');
const moment = require('moment');
const router = express.Router();


router.post('/register',async (req,res)=>{
    const userExist=await UserModel.findOne({
      username:req.body.username
    })
    if(userExist){
      return res.status(502).send({
        msg:'用户已存在'
      })
    }
    const user=await UserModel.create({
      username:req.body.username,
      password:req.body.password,
      registerTime:moment().format('YYYY-MM-DD HH:mm:ss')
    })
    res.send(user);
  })
  
  router.post('/getUserInfo',async (req,res)=>{
    const user=await UserModel.findOne({
      username:req.body.username
    },{username:1,picUrl:1,registerTime:1});
    res.send(user);
  })

  router.post('/login',async (req,res)=>{
    const user=await UserModel.findOne({
      username:req.body.username
    })
    if(!user){
      return res.status(502).send({
        msg:'用户名不存在'
      })
    }
    const passwordVaild=require('crypto').createHash('md5').update(req.body.password).digest('hex')==user.password;
    if(!passwordVaild){
      return res.status(403).send({
        msg:'密码错误'
      })
    }
    res.send({
      user,
      token:'token wsq'
    })
  })

  module.exports = router;