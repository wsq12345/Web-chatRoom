const mongoose=require('mongoose');
const { db_ip } = require('../config');
const url=`mongodb://${db_ip}:27017/runoob`;
mongoose.connect(url,{
    useNewUrlParser:true,
    useCreateIndex:true
});
mongoose.connection.on('connected',()=>{
    console.log('数据库连接成功');
})

module.exports=mongoose;