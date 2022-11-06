var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    _id:{type: Number},
    name:{type: String},
    email: {type: String},
    password: {type: String},
    photo: {data:Buffer, contentType: String}
});

module.exports = mongoose.model('User', UserSchema);