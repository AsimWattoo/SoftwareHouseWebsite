let mongoose = require('mongoose');
let {Schema} = mongoose;

let quoteSchema = new Schema({
    _id: {type: Number, required: true},
    Price: {type: Number, required: [true, "Price for a quote is required"]},
    aid: {type: Number, required: [true, "Admin for a quote is required"]},
    uid: {type: Number, required: [true, "User id for a quote is required"]},
    rid: {type: Number, ref: 'QuoteRequest', required: [true, "Quotes request is required"]},
    Description: String,
    Days: {type: Number, required: [true, "Days for a quote request is required"]},
    Items: {type: [{type: String}], required: [true, "Items for a submitted quote must be provided"]}
});

module.exports = mongoose.model("Quote", quoteSchema);
