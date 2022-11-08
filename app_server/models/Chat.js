var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
    _id :{type: Number},
    cid:{type: Number, ref:'Conversation'},
    sid:{type: Number, ref:'User'},
    rid:{type: Number, ref:'User'}
});

module.exports = mongoose.model('Chat', ChatSchema);