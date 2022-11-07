let mongoose = require('mongoose');
let {Schema} = mongoose;

let serviceSchema = new Schema({
    _id: { type: Number, required: true},
    Title: {
        type: String,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9 ]*$/.test(v);
            },
        },
        message: "{VALUE} is not valid for title",
    },
    Description: String,
    Price: {type: Number, required: 'Price for a service is required'},
    Days: {type: Number, required: 'Number of days required for a work is required'},
    Level: {type: String, enum: ["Easy", "Medium", "Hard"], message: "{VALUE} is not valid for level"},
    Items: {
        type: [
            {
                type: String
            }
        ],
        validate: {
            validator: v => {
                return v.length > 0;
            }
        },
        message: "Items must have at least 1 item",
    }
});

module.exports = mongoose.model("Service", serviceSchema);
