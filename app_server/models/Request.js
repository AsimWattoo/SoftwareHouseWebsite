var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var RequestSchema = new Schema({
    _id:{type: Number, required: true},
    user_id:{type: Number, required: true, ref:'User'},
    service_id:{type: Number, required: true, ref:'Service'},
    status:{type: String, required: true},
    requestDate: {type: Date, required: true},
    totalprice: {type: Number, required: true}
});

module.exports = mongoose.model('Request',RequestSchema);