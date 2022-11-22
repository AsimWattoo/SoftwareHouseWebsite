var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConversationSchema = new Schema({
    _id :{type: Number},
    mid:[{type: Number, ref:'message'}],
 });

module.exports = mongoose.model('Conversation', ConversationSchema);