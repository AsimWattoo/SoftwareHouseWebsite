let express = require('express');
let router = express.Router();

let serviceModel = require("../models/Service");

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
            res.writeHead(404, error);
            console.log(error);
            res.end();
        });

    });
});

module.exports = router;
