var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoomSchema = new Schema({
    _id :{type: Number, required: true},
    profile_pic: {data: Buffer, contentType: String},
    name: {type: String, required: true},
    description:{type: String, required: true},
    members_id:[
        {type: Number, required: true, ref:'User'}
    ],
    CreationDate:{type: Date, required: true},
    admin_id:{type: Number, required: true,ref:'User'},
});

module.exports = mongoose.model('Room', RoomSchema);