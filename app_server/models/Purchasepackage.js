let mongoose = require("mongoose");
let { Schema } = mongoose;

let purchasepackageSchema = new Schema({
  _id: Number,
  uid: Number,
  pid: { type: Number, ref: "Packages" },
  Days: Number,
  Description: String,
  Price: Number,
  Status: String,
  name: String,
});

module.exports = mongoose.model("Purchasepackage", purchasepackageSchema);
