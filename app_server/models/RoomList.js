var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoomListSchema = new Schema({
    _id :{type: Number},
    uid :{type:Number, ref:'User'},
    r_id:[{type: Number, ref:'Room'}],
});

module.exports = mongoose.model('Room', RoomListSchema);