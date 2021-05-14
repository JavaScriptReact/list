const express = require("express");
const router = express.Router();

const itemModel = require("../../models/item");

/**
 * @CRUD { POST , GET , PUT , DELETE }
 * @router { is our API }
 */

router.get("/", function (req, res) {
  res.type("application/json");
  itemModel
    .find()
    .select("date name id")
    .exec()
    .then((result) => {
      res.send(result);
      console.log(result);
    })
    .catch((error) => res.send(error));
});

router.post("/", function (req, res) {
  const newItem = new itemModel({
    name: req.body.name,
    id: req.body.id,
  });

  newItem
    .save()
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
});

router.delete("/:id", function (req, res) {
  const { id } = req.params;
  itemModel
    .findOneAndDelete({ id: id })
    .then((result) => {
      res.send(result);
      console.log(result);
    })
    .catch((error) => res.send(error));
});

module.exports = router;
