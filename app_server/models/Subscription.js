var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubscriptionModel = new Schema({
    _id:{type: Number, required: true},
    p_id : {type: Number, required: true, ref:'Packages'},
    u_id: {type: Number, required: true, ref:'User'},
    start: {type: Date, required: true},
    end: {type: Date, required: true},
});

module.exports = mongoose.model('Subscription',SubscriptionModel);