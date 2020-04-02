//存贮聊天信息

const mongoose=require('mongoose');

const messageSchema=mongoose.Schema({
    username:{ type: String},
    msg:{ type: String},
    date:{ type: Date}
})
const messageModel=mongoose.model('message',messageSchema);
module.exports={
    messageModel
}