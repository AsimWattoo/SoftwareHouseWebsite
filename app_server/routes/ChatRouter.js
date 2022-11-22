var express = require('express');
var router = express.Router();

//Models
var roomModel = require('../models/Room');
var conversationModel = require('../models/Conversation');
let chatModel = require('../models/Chat');
let messageModel = require('../models/Message');

//Create a chatroom
router.post('/room', async function(req, res, next) {
    var roomsList = await roomModel.find({}).sort({_id:-1});
    let id= 0;
    if (roomsList.length>0){
        id = roomsList[0]._id+1;
    }
    req.body["_id"]=id;
    req.body["creationDate"]=  new Date().getDate().toString();
    roomModel.create(req.body).then((result)=>{
        res.writeHead(200,"Room Created successfully!");
        res.write("New Room has been created!");
        res.end();
    }).catch((err)=>{
        res.writeHead(404,"Room Creation Failed!");
        console.log(err);
        res.end();
    });
});
//Delete chatroom
router.delete('/room/:id', function(req, res, next) {
    let id = req.params.id;
    roomModel.deleteOne({_id:id}).then((result)=>{
        res.writeHead(200,"Room Deleted Successfully");
        res.end();
    }).catch((err)=>{
        res.writeHead(404,"Room Deletion Failed!");
        res.end();
    });
});
//Edit chatroom
router.put('/room/:id', function(req, res, next) {
    let id = req.params.id;
    roomModel.findOneAndUpdate({_id:id}, {$set:req.body}).then((result)=>{
         res.writeHead(200,"Room Updated Successfully");
         res.end();
    }).catch((error)=>{
        res.writeHead(404,"Room Not Updated!");
        res.end();
    });
});

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
    var room = await roomModel.findOneAndUpdate({ _id: req.params.rid }, { $push: {members_id:req.params.id} });
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
router.post('/message/send/:sid/:rid',async function(req, res, next) {

    let chat = await chatModel.findOne({sid: req.params.sid, rid: req.params.rid});

    //Create Message
    let mid = 0;
    let messages = await messageModel.find({}).sort({_id: -1});

    if(messages.length > 0)
        mid = messages[0]._id + 1;

    req.body["_id"] = mid;
    req.body["sid"] = req.params.sid;
    messageModel.create(req.body);


    //If the chat is found then no need to create chart
    if(chat == null){
        chat = await chatModel.findOne({sid: req.params.rid, rid: req.params.sid});
        //Create a new chat
        if(chat == null){

            //Creating a conversion
            let cid = 0;
            let conversations = await conversationModel.find({}).sort({_id: -1});
            if(conversations.lenth > 0)
                cid = conversations[0]._id + 1;

            conversationModel.create({_id: cid, mid: [mid]});

            //Creating a Chat
            let chats = await chatModel.find({}).sort({_id: -1});
            let chatId = 0;
            if(chats.length > 0)
                chatId = chats[0]._id + 1;

            chatModel.create({
                _id: chatId,
                cid: cid,
                sid: req.params.sid,
                rid: req.params.rid,
            });

            res.writeHead(200, "Message sent successfully");
            res.end();
            return;
        }
    }

    await conversationModel.findOneAndUpdate({_id: chat.cid}, {$push: {mid: mid}});
    res.writeHead(200, "Message sent successfully");
    res.end();
})

//Send Chat Room Message
router.post('/room/:id/message/',async function(req, res, next) {

    let room = await roomModel.findOne({id: req.params.id});

    //Create Message
    let mid = 0;
    let messages = await messageModel.find({}).sort({_id: -1});

    if(messages.length > 0)
        mid = messages[0]._id + 1;

    req.body["_id"] = mid;

    messageModel.create(req.body);

    if (room == null) {
        res.writeHead(404,"Chat Room Not Found");
        res.end();
    }
    else{
        await conversationModel.findOneAndUpdate({_id: room.id}, {$push: {mid: mid}});
        res.writeHead(200, "Message sent successfully");
        res.end();
    }

})

//View Chat Message
router.get('/messages/:sid/:rid',async function(req, res, next) {
    var sid = req.params.sid;
    var rid = req.params.rid;
    var chat = await chatModel.findOne({sid: sid, rid: rid})
    if (chat==null) {
        chat = await chatModel.findOne({sid: rid, rid: sid});
        if (chat == null) {
            res.writeHead(404,"No chat found!");
            res.end();
            return;
        }
    }
    let conversations = await conversationModel.find({_id: chat.cid});
    if(conversations == null){
        res.writeHead(404, "Conversations not found");
    }
    else{
        res.writeHead(200);
        res.write(JSON.stringify(conversations));
    }
    res.end();
})

//View Chat Room Messages
router.get('/room/:rid/messages',async function(req, res, next) {

    let room = await roomModel.findOne({_id: req.params.rid})
    if (room==null) {

        res.writeHead(404,"Room not found!");
        res.end();

    }
    let conversations = await conversationModel.find({_id: room.c_id}).populate("mid");
    if(conversations == null){
        res.writeHead(404, "Conversation not found");
    }
    else
    {
        res.writeHead(200);
        res.write(JSON.stringify(conversations));
    }
    res.end();
})

//Delete Chat Message
router.delete('/messages/:sid/:rid/:mid',async function(req, res, next) {
    let chat = await chatModel.findOne({sid: req.params.sid, rid: req.params.rid,mid: req.params.mid});


    if(chat == null){
        res.writeHead(200, "Chat not found");
        res.end();
    }
    else{
        await conversationModel.findOneAndUpdate({_id: chat.cid}, {$pull: {mid: mid}});
        res.writeHead(200, "Message deleted successfully");
        res.end();
    }

})

//Delete Chat Room Message
router.delete('/room/:cid/message/:mid',async function(req, res, next) {
    let room = await roomModel.findOne({cid: req.params.cid, mid: req.params.mid});

    if (room == null) {
        res.writeHead(404,"Chat Room Not Found");
        res.end();
    }
    else{
        await conversationModel.findOneAndUpdate({_id: room.id}, {$pull: {mid: mid}});
        res.writeHead(200, "Message deleted successfully");
        res.end();
    }
})
module.exports = router;

module.exports = router;
