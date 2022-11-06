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

module.exports = router;
