let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    _id:{type: Number, required: true},
    name:{
        type: String,
        validate: {
            validator: (v) => {
                return /^[a-zA-Z0-9 ]*$/.test(v);
            }
        },
        message: "{VALUE} is not valid for a username",
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        validate: {
            validator: v => {
                return /^[a-zA-Z0-9]@[0-9a-zA-Z].[a-zA-Z0-9]$/.test(v);
            }
        },
        message: "{VALUE} is not a valid email address",
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    photo: {data:Buffer, contentType: String}
});

module.exports = mongoose.model('User', UserSchema);
