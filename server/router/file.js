const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { UserModel } = require('../models/users');
const { server_ip } = require('../config');

const dirname = path.resolve(__dirname, '..');
const upload = multer({
    dest: './tmp/'
}).array('file');
const uploadImg = multer({
    dest: './tmp/'
}).array('image');

const mkdirsSync = function (dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    }
    if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
    }
}

// 创建文件夹
const createFolder = function (folder) {
    try {
        // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
        // 如果文件路径不存在将会抛出错误"no such file or directory"
        fs.accessSync(folder);
    } catch (e) {
        // 文件夹不存在，以同步的方式创建文件目录。
        mkdirsSync(folder);
    }
};


router.post('/uploadImg', uploadImg, async (req, res) => { //图片上传
    //console.log(req.files[0]);
    createFolder(dirname+"/public/image/");
    let des_file = dirname + "/public/image/" + req.files[0].originalname; //保存目录 /image
    fs.readFile(req.files[0].path, (err, data) => {
        fs.writeFile(des_file, data, (err) => {
            if (err) return res.status(500).send({
                msg: 'error'
            });
            res.send({
                url: `http://${server_ip}:3000/public/image/${req.files[0].originalname}`,
                fileName: req.files[0].originalname
            });
        })
    })
})
router.post('/upload', upload, async (req, res) => { //文件上传
    //console.log(req.files[0]);
    createFolder(dirname+"/public/file/");
    let des_file = dirname + "/public/file/" + req.files[0].originalname; //保存目录 /file
    fs.readFile(req.files[0].path, (err, data) => {
        fs.writeFile(des_file, data, (err) => {
            if (err) return res.status(500).send({
                msg: 'error'
            });
            res.send({
                url: `http://${server_ip}:3000/public/file/${req.files[0].originalname}`,
                fileName: req.files[0].originalname
            });
        })
    })
})

router.post('/avatar',async (req,res)=>{
    await UserModel.update({username:req.body.username},{$set:{picUrl:req.body.picUrl}});
    res.send({msg:'修改成功'});
})

module.exports = router;