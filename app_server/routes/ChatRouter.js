var express = require('express');
var router = express.Router();

//Models 
var userModel = require('../models/User');
var roomModel = require('../models/Room');
const { response } = require('express');



//Create a chatroom
router.post('/room', async function(req, res, next) {
    var roomsList = await roomModel.find({}).sort({_id:-1});
    let id= 0;
    if (roomsList.length>0){
        id = roomsList[0]._id+1;
    }
    req.body["_id"]=id;
    roomModel.create(req.body).then((result)=>{
        res.writeHead(result);
        res.end();
    }).catch((err)=>{
        res.writeHead(404,"Room creation Failed!")
        res.write(err);
        res.end();
    })
});
//Delete chatroom
router.delete('/room/:id', function(req, res, next) {
    
});
//Edit chatroom
router.put('/room/:id', function(req, res, next) {});

//Viwe Chat Room Settings
router.get('/room/:id',async function(req, res, next) {
    var room = await roomModel.findOne({_id:req.params.id});
    if (room == null) {
        res.writeHead(404,"Room Not Found");
        res.end();
    }
    else{
        res.writeHead(200);
        res.write(JSON.stringify(room));
        res.end();
    }
})

//View Chat Room Members
router.get('/room/:id/members',async function(req, res, next) {
    var members_list = await roomModel.find({_id:req.params.id});
    if (members_list == null) {
        res.writeHead(404,"Members Not Found");
        res.end();
    }
    else{
        res.writeHead(200);
        res.write(JSON.stringify(members_list));
        res.end();
    }
})

//Join Chat Room
router.put('/room/:rid/join/:id',async function(req, res, next) {
    var room = await roomModel.findOneAndUpdate({ _id: req.params.rid }, { $push: {members_id:id} });
    if (room == null) {
        res.writeHead(404,"Chat Roon Not Joined");
        res.end();
    }
    else{
        res.writeHead(200, "Chat Room Joined");
    
        res.end();
    }

})

//Leave Chat Room
router.put('/room/:rid/join/:id',async function(req, res, next) {
    var room = await roomModel.findOneAndUpdate({ _id: req.params.rid }, { $pull: {members_id:id} });
    if (room == null) {
        res.writeHead(404,"Chat Room Leaved");
        res.end();
    }
    else{
        res.writeHead(200, "Chat Room Not Leaved");
    
        res.end();
    }

})

//Send Chat Message
router.put('/message/send/:sid/:rid',async function(req, res, next) {
    var room = await roomModel.findOneAndUpdate({ _id: req.params.rid }, { $push: {members_id:sid} });

})

//Send Chat Room Message
router.put('/room/:id/message/',async function(req, res, next) {})

//View Chat Message
router.put('/messages/:sid/:rid',async function(req, res, next) {})

//View Chat Room Message
router.put('/room/:cid/message',async function(req, res, next) {})

//Delete Chat Message
router.put('/messages/:sid/:rid/:mid',async function(req, res, next) {})

//Delete Chat Room Message
router.put('/room/:cid/message/:mid',async function(req, res, next) {})

//Add Member
router.put('/chat/room/:cid/addmember/:id',async function(req, res, next) {})

module.exports = router;
