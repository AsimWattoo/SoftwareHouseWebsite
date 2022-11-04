let mongoose = require('mongoose');
let {Schema} = mongoose;

let serviceSchema = new Schema({
    _id: Number,
    Title: String,
    Description: String,
    Price: Number,
    Days: Number,
    Level: String,
    Items: [
        {
            type: String
        }
    ]
});

module.exports = mongoose.model("Service", serviceSchema);
