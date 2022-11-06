var express = require('express');
var router = express.Router();

//Models 
var userModel = require('../models/User');
var roomModel = require('../models/Room');



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

module.exports = router;
