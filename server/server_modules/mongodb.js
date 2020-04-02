const mongoose=require('mongoose');
const url="mongodb://localhost:27017/runoob";
mongoose.connect(url,{
    useNewUrlParser:true,
    useCreateIndex:true
});
mongoose.connection.on('connected',()=>{
    console.log('数据库连接成功');
})

module.exports=mongoose;