const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const router=express.Router();
require('./server_modules/mongodb')
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false})); //body-parser获取表单数据

app.use('/public',express.static('./public'));
app.use(multer({ dest: './tmp/'}).array('file'));

app.all("*", function(req, res, next) { //跨域
   if (!req.get("Origin")) return next();
   // use "*" here to accept any origin
   res.set("Access-Control-Allow-Origin", "*");
   res.set("Access-Control-Allow-Methods", "GET,POST");//   res.set("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
   // res.set('Access-Control-Allow-Max-Age', 3600);
   if ("OPTIONS" === req.method) return res.send(200);
   next();
});

app.post('/upload',async (req,res)=>{  //文件上传
  console.log(req.files[0]);
  let des_file=__dirname+"/public/file/"+req.files[0].originalname; //保存目录 /file
  fs.readFile(req.files[0].path,(err,data)=>{
    fs.writeFile(des_file,data,(err)=>{
      if(err) console.log(err);
      res.send({
        url:`http://localhost:3000/public/file/${req.files[0].originalname}`,
        fileName:req.files[0].originalname
      });
    })
  })
})

app.use(router);
app.get('/',async (req,res)=>{
  res.sendFile(__dirname + '/' +'index.html');
})
app.use('/user', require('./router/user'));  //用户信息
app.use('/message', require('./router/message'));  //用户信息

app.listen(3000,()=>{
  console.log("http://localhost:3000");
})
require('./server_modules/webSocket');


