let express = require("express");
let router = express.Router();

let requestModel = require("../models/QuoteRequest");
let quoteModel = require("../models/Quote");
const {request} = require("express");

//Route to create a quote request
// /quotes/request
router.post("/request", async (req, res, next) => {

    let records = await requestModel.find({}).sort({_id: -1});

    let id = 0;
    if (records.length > 0) id = records[0]._id + 1;

    req.body["_id"] = id;
    req.body["status"] = "Waiting";

    let model = new requestModel(req.body);

    let error = model.validateSync();

    if(error != null){
        res.writeHead(404, "Invalid Data");
        res.write(error.message);
        res.end();
        return;
    }

    try{
        model.save();
        res.writeHead(201, "Creation Successful");
        res.write(
            JSON.stringify({
                Location: `http://127.0.0.1:3000/quotes/request/${id}`,
            })
        );
        res.end();
    }
    catch (e){
        console.log(err);
        res.writeHead(400, "Creation Failed");
        res.write(err);
        res.end();
    }
});

//Route to get a quote request
router.get("/requests/:id", async (req, res, next) => {
  requestModel
    .find({ _id: req.params.id })
    .populate("Service")
    .then((result) => {
      if (result.length > 0) {
        res.writeHead(200);
        res.write(JSON.stringify(result[0]));
      } else {
        res.writeHead(404, "Not Found");
      }
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.writeHead(404, "Not found");
      res.write(err);
      res.end();
    });
});

//Route to get all the quote requests
router.get("/requests", (req, res) => {
  requestModel
    .find({})
    .populate("Service")
    .then((records) => {
      res.writeHead(200);
      res.write(JSON.stringify(records));
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.writeHead(404, "No records found");
      res.write(err);
      res.end();
    });
});

//Route to withdraw quote request
router.delete("/requests/:id", (req, res) => {
  requestModel
    .deleteOne({ _id: req.params.id })
    .then((result) => {
      res.writeHead(200, "Deleted Successfully");
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.writeHead(404, "Not found");
      res.write(err);
      res.end();
    });
});

//Route to send a quote
router.post("/send/:rid", async (req, res) => {

    //Checking if the request exists
    let request = await requestModel.findOne({_id: req.params.rid});

    if(request == null){
        res.writeHead(404, "Quote Request not found");
        res.end();
        return;
    }

  let existingQuotes = await quoteModel.find({}).sort({ _id: -1 });
  let id = 0;
  if (existingQuotes.length > 0) id = existingQuotes[0]._id + 1;
  req.body["_id"] = id;
  req.body["rid"] = req.params.rid;

  let model = new quoteModel(req.body);
  let error = model.validateSync();

  if(error != null){
      res.writeHead(400, "Invalid data for the quote");
      res.write(error.message);
      res.end();
      return;
  }

  try{
      model.save();
      res.writeHead(200, "Created Successfully");
      res.write(JSON.stringify({ URL: `http://127.0.0.1:3000/quotes/${id}` }));
      res.end();
  } catch(e){
      console.log(err);
      res.writeHead(404, "Creation Failed");
      res.write(err);
      res.end();
  }
});

//Route to delete a quote
router.delete("/:id", (req, res) => {
  quoteModel
    .deleteOne({ _id: req.params.id })
    .then(() => {
      res.writeHead(200, "Deleted Successfully");
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.writeHead(404, "Quote Not Found");
      res.write(err);
      res.end();
    });
});

//Route to view all the quotes
router.get("/allquotes", (req, res) => {
  quoteModel
    .find({})
    .then((result) => {
      res.writeHead(200);
      res.write(JSON.stringify(result));
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.writeHead(404, "Quote Not Found");
      res.write(err);
      res.end();
    });
});

//Route To View a Specific Quote
router.get("/:id", (req, res) => {
  quoteModel
    .find({ _id: req.params.id })
    .populate("rid")
    .then((result) => {
      res.writeHead(200);
      res.write(JSON.stringify(result));
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.writeHead(404, "Quote Not Found");
      res.write(err);
      res.end();
    });
});

module.exports = router;
