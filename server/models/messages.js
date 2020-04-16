//存贮聊天信息

const mongoose=require('mongoose');

const messageSchema=mongoose.Schema({
    username:{ type: String},
    msg:{ type: String},
    date:{ type: Date},
    type:{ type: Number}, //0为群聊，1为私聊
    friend:{ type: String}
})
const messageModel=mongoose.model('message',messageSchema);
module.exports={
    messageModel
}