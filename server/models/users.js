//存贮用户信息

const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    username:{ type: String, unique: true},
    password:{ type: String,
        set(val){
            return require('crypto').createHash('md5').update(val).digest('hex');
        }
    },
    registerTime:{ type: Date},
    picUrl:{ type: String, default:"http://127.0.0.1:3000/public/image/touxiang.jpg"}
})
const UserModel=mongoose.model('user',userSchema);
module.exports={
    UserModel
}