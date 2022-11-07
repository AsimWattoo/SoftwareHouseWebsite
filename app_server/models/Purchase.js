let mongoose = require('mongoose');
let {Schema} = mongoose;

let purchaseSchema = new Schema({
    _id: {type: Number, required: true},
    uid: {type: Number, required: [true, "User Id for a purchase is required"]},
    sid: {type: Number, ref: 'Service', required: [true, "Service Id which is being purchased is required"]},
    Days: {type: Number, required: [true, "Number of days for which the service is purchased must not be empty"]},
    Description: String,
    Price: {type: Number, required: [true, "Price for a purchase is required"]},
    Status: {type: String, enum: ["InProgress", "Cancelled", "Completed"]}
});


module.exports = mongoose.model("Purchase", purchaseSchema);
