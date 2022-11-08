let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AdminSchema = new Schema({
    _id:{type: Number, required: [true, "Id for an admin is required"]},
    name: {
        type: String,
        required: [true, "Admin name is required"],
        validate: {
            validator: v => {
                return /^[a-zA-Z0-9 ]$/.test(v);
            }
        },
        message: "{VALUE} is not valid for an admin name"
    },
    email:{
        type: String,
        required: [true, "Email for an admin is required"],
        validate: {
            validator: v => {
                return /^[a-zA-Z0-9]@[0-9a-zA-Z].[a-zA-Z0-9]$/.test(v);
            }
        },
        message: "{VALUE} is not valid for an email"
    },
    password:{
        type: String,
        required: [true, "Password for an admin is required"]
    },
    photo: {data: Buffer , contentType: String}
});
module.exports =  mongoose.model('Admin',AdminSchema);
