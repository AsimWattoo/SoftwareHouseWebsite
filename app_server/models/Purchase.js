let mongoose = require('mongoose');
let {Schema} = mongoose;

let purchaseSchema = new Schema({
    _id: Number,
    uid: Number,
    sid: {type: Number, ref: 'Service'},
    Days: Number,
    Description: String,
    Price: Number,
    Status: String
});


module.exports = mongoose.model("Purchase", purchaseSchema);
