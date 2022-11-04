let mongoose = require('mongoose');
let {Schema} = mongoose;

let reqSchema = new Schema({
    _id: Number,
    UserId: Number,
    Details: String,
    Status: String,
    Budget: Number,
    Days: Number,
    Service: {type: Number, ref: 'Service'}
});

module.exports = mongoose.model("QuoteRequest", reqSchema);
