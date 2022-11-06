var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    _id :{type: Number},
    sid: {type: Number, ref:'User'},
    message:{type: String},
    CreationDate:{type: Date},
      
    
});

module.exports = mongoose.model('Message', MessageSchema);              