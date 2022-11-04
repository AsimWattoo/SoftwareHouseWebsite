let express = require('express');
let router = express.Router();

let requestModel = require('../models/QuoteRequest');

//Route to create a quote request
router.post("/request", (req, res, next) => {
    requestModel.find({}).sort({_id: -1}).then(records => {

        let id = 0;
        if(records.length > 0)
            id = records[0]._id + 1;

        req.body["_id"] = id;
        req.body['status'] = 'Waiting';
        requestModel.create(req.body).then(creationResult => {
            res.writeHead(201, "Creation Successful");
            res.write(JSON.stringify({"Location": `http://127.0.0.1:3000/quotes/request/${id}`}));
            res.end();
        }).catch(err => {
            console.log(err);
            res.writeHead(400, "Creation Failed");
            res.write(err);
            res.end();
        });

    }).catch(error => {
       console.log(error);
       res.writeHead(400, "Creation Failed");
       res.write(error);
       res.end();
    });
});

//Route to get a quote request
router.get("/request/:id", (req, res, next) => {
   requestModel.find({_id: req.params.id}).populate("Service").then(result => {
        if(result.length > 0){
            res.writeHead(200);
            res.write(JSON.stringify(result[0]));
        }
        else{
            res.writeHead(404, "Not Found");
        }
        res.end();
   }).catch(err => {
       console.log(err);
       res.writeHead(404, "Not found");
       res.write(err);
       res.end();
   });
});

module.exports = router;
