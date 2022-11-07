let mongoose = require('mongoose');
let {Schema} = mongoose;

let reqSchema = new Schema({
    _id: {type: Number, required: [true, "Id for a quote request is required"]},
    UserId: {type: Number, required: [true, "User id is required for a quote request"]},
    Details: String,
    Status: {type: String, enum: ['Waiting', 'Answered'], message: `{VALUE} is not supported`},
    Budget: {type: Number, required: [true, "Budget for a quote request"]},
    Days: {type: Number, required: [true, "Days for quote is required"]},
    Service: {type: Number, ref: 'Service', required: [true, "Service is required for quote request"]}
});

module.exports = mongoose.model("QuoteRequest", reqSchema);
