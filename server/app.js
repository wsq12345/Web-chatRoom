const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const { server_ip } = require('./config');
const app = express();
const router=express.Router();
require('./server_modules/mongodb')
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false})); //body-parser获取表单数据
app.use('/public',express.static('./public'));

app.all("*", function(req, res, next) { //跨域
   if (!req.get("Origin")) return next();
   // use "*" here to accept any origin
   res.set("Access-Control-Allow-Origin", "*");
   res.set("Access-Control-Allow-Methods", "GET,POST");//   res.set("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
   // res.set('Access-Control-Allow-Max-Age', 3600);
   if ("OPTIONS" === req.method) return res.send(200);
   next();
});

app.use(router);
app.get('/',async (req,res)=>{
  res.sendFile(__dirname + '/' +'index.html');
})
app.use('/user', require('./router/user'));  //用户信息
app.use('/message', require('./router/message'));  
app.use('/friend', require('./router/friend'));
app.use('/file',require('./router/file'));

app.listen(3000,()=>{
  console.log(`http://${server_ip}:3000`);
})
require('./server_modules/webSocket');


