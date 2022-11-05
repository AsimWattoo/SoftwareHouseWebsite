let mongoose = require("mongoose");
let { Schema } = mongoose;

let packageSchema = new Schema({
  _id: Number,
  name: String,
  sid: { type: Number, ref: "Service" },
  Description: String,
  Price: Number,
  Days: Number,
  Items: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Package", packageSchema);
