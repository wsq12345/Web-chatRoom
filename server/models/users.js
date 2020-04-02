//存贮用户信息

const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    username:{ type: String, unique: true},
    password:{ type: String,
        set(val){
            return require('crypto').createHash('md5').update(val).digest('hex');
        }
    },
    registerTime:{ type: Date}
})
const UserModel=mongoose.model('user',userSchema);
module.exports={
    UserModel
}