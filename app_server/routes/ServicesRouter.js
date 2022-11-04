let express = require('express');
let router = express.Router();

let serviceModel = require("../models/Service");

//Route to create the service
router.post("/create", (req, res, next) => {
    serviceModel.find({}).sort({_id: -1}).then(records => {
        let id = 0;
        if(records.length > 0)
            id = records[0]._id + 1;

        req.body["_id"] = id;

        //Creating record in the database
        serviceModel.create(req.body).then((createResponse) => {

            res.writeHead(201, "Service Created Successfully");
            res.write(JSON.stringify({"Location": `http://127.0.0.1:3000/service/${id}`}));
            res.end();
        })
        .catch(error => {
            res.writeHead(404, "Creation Failed");
            res.write(error);
            console.log(error);
            res.end();
        });

    }).catch(error => {
        res.writeHead(404, "Creation Failed");
        res.write(error);
        console.log(error);
        res.end();
    });
});

//Route to edit the service
router.put("/edit/:id", (req, res, next) => {
    //Getting and modifying the service
    serviceModel.updateOne({_id: req.params.id}, {$set: req.body}).then(result => {
        res.writeHead(200, "Update Successful");
        res.end();
    }).catch(error => {
        console.log(error);
        res.writeHead(400);
        res.write(error);
        res.end();
    });
});

//Route to delete an existing service
router.delete("/delete/:id", (req, res, next) => {
   serviceModel.deleteOne({_id: req.params.id}).then(result => {
      res.writeHead(200, "Deleted Successfully");
      res.end();
   }).catch(error => {
       console.log(error);
       res.writeHead(404, "Delete Unsuccessful");
       res.write(error);
       res.end();
   });
});

module.exports = router;
