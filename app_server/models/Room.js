var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoomSchema = new Schema({
    _id :{type: Number},
    profile_pic: {data: Buffer, contentType: String},
    c_id: {type: Number, ref: 'Conversation'},
    name: {type: String},
    description:{type: String},
    members_id:[
        {type: Number, ref:'User'}
    ],
    CreationDate:{type: Date},
    admin_id:{type: Number,ref:'User'},
});

module.exports = mongoose.model('Room', RoomSchema);