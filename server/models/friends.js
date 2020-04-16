const mongose = require('mongoose');

const friendSchema = mongose.Schema({
    username: {type: String},
    friend: {type: mongose.Schema.Types.ObjectId,ref: 'users'},
    status: {type: Number}
})

const friendModel = mongose.model('friend',friendSchema);
module.exports={
    friendModel 
}