var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var RequestSchema = new Schema({
    _id:{type: Number},
    user_id:{type: Number, ref:'User'},
    service_id:{type: Number, ref:'Service'},
    status:{type: String},
    requestDate: {type: Date},
    totalprice: {type: Number}
});

module.exports = mongoose.model('Request',RequestSchema);