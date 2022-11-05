let express = require("express");
let router = express.Router();

let serviceModel = require("../models/Service");
let purchaseModel = require("../models/Purchase");
let packageModel = require("../models/Packages");

//Route to create the service
router.post("/create", (req, res, next) => {
  serviceModel
    .find({})
    .sort({ _id: -1 })
    .then((records) => {
      let id = 0;
      if (records.length > 0) id = records[0]._id + 1;

      req.body["_id"] = id;

      //Creating record in the database
      serviceModel
        .create(req.body)
        .then((createResponse) => {
          res.writeHead(201, "Service Created Successfully");
          res.write(
            JSON.stringify({ Location: `http://127.0.0.1:3000/service/${id}` })
          );
          res.end();
        })
        .catch((error) => {
          res.writeHead(404, "Creation Failed");
          res.write(error);
          console.log(error);
          res.end();
        });
    })
    .catch((error) => {
      res.writeHead(404, "Creation Failed");
      res.write(error);
      console.log(error);
      res.end();
    });
});

//Route to edit the service
router.put("/edit/:id", (req, res, next) => {
  //Getting and modifying the service
  serviceModel
    .updateOne({ _id: req.params.id }, { $set: req.body })
    .then((result) => {
      res.writeHead(200, "Update Successful");
      res.end();
    })
    .catch((error) => {
      console.log(error);
      res.writeHead(400);
      res.write(error);
      res.end();
    });
});

//Route to delete an existing service
router.delete("/delete/:id", (req, res, next) => {
  serviceModel
    .deleteOne({ _id: req.params.id })
    .then((result) => {
      res.writeHead(200, "Deleted Successfully");
      res.end();
    })
    .catch((error) => {
      console.log(error);
      res.writeHead(404, "Delete Unsuccessful");
      res.write(error);
      res.end();
    });
});

// Route to view a specific service
router.get("/:id", (req, res) => {
  serviceModel
    .findOne({ _id: req.params.id })
    .then((result) => {
      res.writeHead(200);
      res.write(JSON.stringify(result));
      res.end();
    })
    .catch((error) => {
      console.log(error);
      res.writeHead(404, "Not Found");
      res.write(error);
      res.end();
    });
});

//Route to view all the services
router.get("/", (req, res) => {
  serviceModel
    .find({})
    .then((result) => {
      res.writeHead(200);
      res.write(JSON.stringify(result));
      res.end();
    })
    .catch((error) => {
      console.log(error);
      res.writeHead(404, "Not Found");
      res.write(error);
      res.end();
    });
});

//Route to purchase a service
router.post("/:sid/buy", async (req, res) => {
  let service = await serviceModel.findOne({ _id: req.params.sid });
  let error = (message) => {
    res.writeHead(404, message);
    res.end();
  };

  if (service == null) {
    error("Service not found");
    return;
  }

  let purchases = await purchaseModel.find({}).sort({ _id: -1 });
  let id = 0;

  if (purchases.length > 0) id = purchases[0]._id + 1;

  req.body["_id"] = id;
  req.body["sid"] = req.params.sid;
  req.body["Status"] = "InProgress";
  purchaseModel
    .create(req.body)
    .then((result) => {
      res.writeHead(201, "Resource Created Successfully");
      res.write(
        JSON.stringify({ URL: `http://127.0.0.1/service/purchased/${id}` })
      );
      res.end();
    })
    .catch((err) => {
      error(err);
    });
});

//Route to view a purchased service
router.get("/purchased/:id", (req, res) => {
  purchaseModel
    .findOne({ _id: req.params.id })
    .then((result) => {
      res.writeHead(200);
      res.write(JSON.stringify(result));
      res.end();
    })
    .catch((error) => {
      console.log(error);
      res.writeHead(404, "Not Found");
      res.write(error);
      res.end();
    });
});

//Route to view purchased services for a user
router.get("/user/:uid", (req, res) => {
  purchaseModel
    .find({ uid: req.params.uid })
    .then((result) => {
      res.writeHead(200);
      res.write(JSON.stringify(result));
      res.end();
    })
    .catch((error) => {
      console.log(error);
      res.writeHead(404, "Not Found");
      res.write(error);
      res.end();
    });
});

//Route to cancel a purcahse
router.put("/purchased/cancel/:id", (req, res) => {
  purchaseModel
    .findOneAndUpdate({ _id: req.params.id }, { $set: { Status: "Cancelled" } })
    .then((result) => {
      res.writeHead(200, "Cancelled successfully");
      res.end();
    })
    .catch((error) => {
      console.log(error);
      res.writeHead(404, "Not Found");
      res.write(error);
      res.end();
    });
});

//Route to create Package

router.post("/package", (req, res, next) => {
  packageModel
    .find({})
    .sort({ _id: -1 })
    .then((records) => {
      let id = 0;
      if (records.length > 0) id = records[0]._id + 1;

      req.body["_id"] = id;

      //Creating record in the database
      packageModel
        .create(req.body)
        .then((createResponse) => {
          res.writeHead(201, "Service Created Successfully");
          res.write(
            JSON.stringify({ Location: `http://127.0.0.1:3000/service/${id}` })
          );
          res.end();
        })
        .catch((error) => {
          res.writeHead(404, "Creation Failed");
          res.write(error);
          console.log(error);
          res.end();
        });
    })
    .catch((error) => {
      res.writeHead(404, "Creation Failed");
      res.write(error);
      console.log(error);
      res.end();
    });
});

//Route to view all the packages
router.get("/package/all", (req, res) => {
  packageModel
    .find({})
    .then((result) => {
      res.writeHead(200);
      res.write(JSON.stringify(result));
      res.end();
    })
    .catch((error) => {
      console.log(error);
      res.writeHead(404, "Not Found");
      res.write(error);
      res.end();
    });
});

//Route to View a specific Package
router.get("/package/:id", (req, res) => {
  packageModel
    .findOne({ _id: req.params.id })
    .then((result) => {
      res.writeHead(200);
      res.write(JSON.stringify(result));
      res.end();
    })
    .catch((error) => {
      console.log(error);
      res.writeHead(404, "Not Found");
      res.write(error);
      res.end();
    });
});

//Route to Delete a Package

router.delete("/package/del/:id", (req, res) => {
  packageModel
    .deleteOne({ _id: req.params.id })
    .then((result) => {
      res.writeHead(200, "Deleted Successfully");
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.writeHead(404, "Not Found");
      res.write(err);
      res.end();
    });
});

module.exports = router;
