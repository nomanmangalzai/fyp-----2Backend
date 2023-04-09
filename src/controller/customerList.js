const express = require("express");
const res = require("express/lib/response");
const users = require("../models/auth");

exports.viewAllCustomers = async (req, res, next) => {
  console.log("Mubarak! The viewAllCustomers API has been hit.");
  try {
    const allCustomers = await users.find({}, { password: 0, __v: 0});
    res.send(allCustomers);
  } catch (error) {
    console.log("Couldn't show users." + error.message);
  }
};

exports.deleteCustomer = async (req, res, next) => {
  console.log("MUBARAK! DELETE CUSTOMER API HAS BEEN CALLED.");
  // const { id } = req.body; // destructuring method.
  // {id} has same spelling in req.body when api is called.
  let id = req.params.id;
  users.findOneAndDelete({ customerId: id }, function (err, docs) {
    if (err) {
      res.send("Error! Wrong key entered");
    } else {
      if (docs === null) {
        console.log(docs);

        res.send("Wrong ID");
      } else {
        res.send("The requested user deleted");
      }
    }
  });
};

// let deleteId = req.params.id;
// ImageModel.findOneAndDelete({ SKU: deleteId }, function (err, docs) {
//   if (err) {
//     res.send("Error! You have entered wrong key.");
//   } else {
//     if (docs === null) {
//       res.send("Wrong ID");
//     } else {
//       res.send(
//         "The requested record with SKU = " + deleteId + " has been deleted"
//       );
//     }
//   }
// });
