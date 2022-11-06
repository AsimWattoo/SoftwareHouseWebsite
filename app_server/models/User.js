var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    _id:{type: Number, required: true},
    name:{type: String, required: true},
    email: {type: String,required:true},
    password: {type: String,required:true},
    photo: {data:Buffer, contentType: String}
});

module.exports = mongoose.model('User', UserSchema);