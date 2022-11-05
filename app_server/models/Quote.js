let mongoose = require('mongoose');
let {Schema} = mongoose;

let quoteSchema = new Schema({
    _id: Number,
    Price: Number,
    aid: Number,
    uid: Number,
    rid: {type: Number, ref: 'QuoteRequest'},
    Description: String,
    Days: Number,
    Items: [{type: String}]
});

module.exports = mongoose.model("Quote", quoteSchema);
