var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatListSchema = new Schema({
    _id :{type: Number},
    uid :{type:Number, ref:'User'},
    c_id:[{type: Number, ref:'Chat'}],
});

module.exports = mongoose.model('ChatList', ChatListSchema);