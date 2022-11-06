var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubscriptionModel = new Schema({
    _id:{type: Number},
    p_id : {type: Number, ref:'Packages'},
    u_id: {type: Number,  ref:'User'},
    start: {type: Date},
    end: {type: Date },
    price : {type: Number},
    status: String
});

module.exports = mongoose.model('Subscription',SubscriptionModel);