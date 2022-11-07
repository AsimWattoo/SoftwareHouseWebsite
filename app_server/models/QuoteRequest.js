let mongoose = require('mongoose');
let {Schema} = mongoose;

let reqSchema = new Schema({
    _id: Number,
    UserId: Number,
    Details: String,
    Status: {type: String, enum: ['Waiting', 'Answered'], message: `{VALUE} is not supported`},
    Budget: Number,
    Days: Number,
    Service: {type: Number, ref: 'Service'}
});

module.exports = mongoose.model("QuoteRequest", reqSchema);
