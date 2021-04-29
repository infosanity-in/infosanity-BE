const db = require("../models");

// Find a single Item from the DB
const findOneExample = (req, res) => {
  db.Example.findById(req.params.id, (err, data) => {
    if (err) console.log("Error in finding the data: ", err);
    res.json(data);
  });
};

// Find/Get all the items from the DB
const findAllExample = (req, res) => {
  db.Example.find({}, (err, data) => {
    if (err) console.log("Error in finding the data: ", err);
    res.json(data);
  });
};

// Create a new Example
const createExample = (req, res) => {
  db.Example.create(req.body, (err, data) => {
    if (err) console.log("Error in finding the data: ", err);
    res.json(data);
  });
};

// Update existing example
const updateExample = (req, res) => {
  db.Example.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, data) => {
      if (err) console.log("Error in finding the data: ", err);
      res.json(data);
    }
  );
};

// Delete an example
const deleteExample = (req, res) => {
  db.Example.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) console.log("Error in finding the data: ", err);
    res.sendStatus(200);
    console.log("Item Deleted Successfully");
  });
};

module.exports = {
  findOneExample,
  findAllExample,
  createExample,
  updateExample,
  deleteExample,
};
