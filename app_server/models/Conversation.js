var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConversationSchema = new Schema({
    _id :{type: Number, required: true},
    mid:[{type: Number, ref:'message', required: true}],
    
        
});

module.exports = mongoose.model('Conversation', ConversationSchema);