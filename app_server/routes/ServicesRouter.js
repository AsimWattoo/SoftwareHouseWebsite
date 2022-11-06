let express = require("express");
let router = express.Router();

let serviceModel = require("../models/Service");
let purchaseModel = require("../models/Purchase");
let packageModel = require("../models/Packages");
let PurchasepackageModel = require("../models/Purchasepackage");
let adminModel = require('../models/Admin');
let subscriptionModel = require('../models/Subscription');
let userModel = require('../models/User');
let requestModel = require('../models/Request');

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

//Route to subscribe a package
router.post("/package/:pid/subscribe", async (req, res) => {
  let package = await packageModel.findOne({ _id: req.params.pid });
  let error = (message) => {
    res.writeHead(404, message);
    res.end();
  };

  if (package == null) {
    error("package not found");
    return;
  }

  let purchases = await PurchasepackageModel.find({}).sort({ _id: -1 });
  let id = 0;

  if (purchases.length > 0) id = purchases[0]._id + 1;

  req.body["_id"] = id;
  req.body["pid"] = req.params.pid;
  req.body["Status"] = "InProgress";
  PurchasepackageModel.create(req.body)
    .then((result) => {
      res.writeHead(201, "Resource Created Successfully");
      res.write(
        JSON.stringify({
          URL: `http://127.0.0.1/service/package/purchased/${id}`,
        })
      );
      res.end();
    })
    .catch((err) => {
      error(err);
    });
});

//Route to cancel a subscribepackage
router.put("/package/unsubscribe/:id", (req, res) => {
  PurchasepackageModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { Status: "Unsubscribed" } }
  )
    .then((result) => {
      res.writeHead(200, "Unsubscribed Successfully");
      res.end();
    })
    .catch((error) => {
      console.log(error);
      res.writeHead(404, "Not Found");
      res.write(error);
      res.end();
    });
});

//Route to view all the subscribe packages
router.get("/package/subscribe/all", (req, res) => {
  PurchasepackageModel.find({})
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

//Route to View All the sales for Services
router.get("/sale/all", (req, res) => {
  purchaseModel
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

//Route to View All the sales for specific Services
router.get("/sale/:sid", (req, res) => {
  purchaseModel
    .find({ _id: req.params.sid })
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

/* HAZIQ */

//View Package Subscription
router.get('/package/:id/subscriptions', function(req, res, next) {
  let id = req.params.id;
  subscriptionModel.find({p_id: id}).populate("Packages").then((result) => {
    res.writeHead(200,"Subscriptions Found!");
    res.write(JSON.stringify(result));
    res.end();
  })
  .catch((error) => {
    res.writeHead(404, "Not Subscription Found!");
    res.write(error);
    res.end();
  });
});
//View Subscription Status
router.get('/subscription/:id', function(req, res, next) {
    subscriptionModel.findOne({_id: req.params.id}).aggregate([
      {$project:{status:1}}
    ]).then((result) => {
      res.writeHead(200,"Subscription Data Retired!");
      res.write(JSON.stringify(result));
      res.end();
    })
    .catch((error) => {
      res.writeHead(404, "Failed to retrieve subscription data!");
      res.write(error);
      res.end();
    });
});
//Accept Service Request
router.put('/request/:id/accept', function(req, res, next) {
  requestModel.findOneAndUpdate({_id: req.params.id}, { $set:{status:"Accepted"}}).then((result) => {
    res.writeHead(200,"Request Approved!");
    res.end();
  })
  .catch((error) => {
    res.writeHead(404, "Status Update Failed");
    res.write(error);
    res.end();
  });
});
//Reject Service Request
router.put('/request/:id/reject', function(req, res, next) {
  requestModel.findOneAndUpdate({_id: req.params.id}, { $set:{status:"Rejected"}}).then((result) => {
    res.writeHead(200,"Request Rejected!");
    res.end();
  })
  .catch((error) => {
    res.writeHead(404, "Status Update Failed");
    res.write(error);
    res.end();
  });
});
//View Service Requests 
router.get('/requests', function(req, res, next) {
  requestModel.find({}).then((result) => {
    res.writeHead(200,"Requests Retrieved!");
    res.end();
  })
  .catch((error) => {
    console.log(error);
    res.writeHead(404, "No Request Found!");
    res.write(error);
    res.end();
  });
});
//View a Service Request
router.get('/requests/:id', function(req, res, next) {
  requestModel.findOne({_id:req.params.id}).then((result) => {
    res.writeHead(200,"Request Found!");
    res.end();
  }).catch((error) => {
    res.writeHead(404, "No Request Found!");
    res.write(error);
    res.end();
  });
});
//Add a User
router.post('/user/add', async function(req, res, next) {
  var userList = await userModel.find({}).sort({_id:-1});
    let id= 0;
    if (userList.length>0){
        id = userList[0]._id+1;
    }
    req.body["_id"]=id;
    userModel.create(req.body).then((result)=>{
        res.writeHead(200,"User Added successfully!");
        res.write("New User has been created!");
        res.end();
    }).catch((err)=>{
        res.writeHead(404,"User Addition Failed!");
        console.log(err);
        res.end();
    });
});
//Remove a User
router.delete('/user/remove/:id', function(req, res, next) {
  let id = req.params.id;
  userModel.deleteOne({_id:id}).then((result)=>{
      res.writeHead(200,"User Deleted Successfully");
      res.end();
  }).catch((err)=>{
      res.writeHead(404,"User Deletion Failed!");
      res.end();
  });
});
//Add an Admin
router.post('/admin/add', async function(req, res, next) {
  var adminList = await adminModel.find({}).sort({_id:-1});
    let id= 0;
    if (adminList.length>0){
        id = adminList[0]._id+1;
    }
    req.body["_id"]=id;
    adminModel.create(req.body).then((result)=>{
        res.writeHead(200,"Admin Added successfully!");
        res.write("New Admin has been created!");
        res.end();
    }).catch((err)=>{
        res.writeHead(404,"Admin Addition Failed!");
        console.log(err);
        res.end();
    });
});
//Remove an Admin
router.delete('/admin/remove/:id', async function(req, res, next) {
  let id = req.params.id;
  adminModel.deleteOne({_id:id}).then((result)=>{
      res.writeHead(200,"Admin Deleted Successfully");
      res.end();
  }).catch((err)=>{
      res.writeHead(404,"Admin Deletion Failed!");
      res.end();
  });
});

module.exports = router;
