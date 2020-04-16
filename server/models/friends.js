const mongose = require('mongoose');

const friendSchema = mongose.Schema({
    username: {type: String},
    friend: {type: String},
    status: {type: Number}
})

const friendModel = mongose.model('friend',friendSchema);
module.exports={
    friendModel 
}