var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
    _id :{type: Number},
    id:[{type: Number, ref:'message'}],
    sid:[{type: Number, ref:'message'}],
    rid:[{type: Number, ref:'message'}]
    
        
});

module.exports = mongoose.model('Conversation', ChatSchema);