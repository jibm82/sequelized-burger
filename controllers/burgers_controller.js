const express = require("express");
const router = express.Router();
const burger = require("../models/burger");

router.get("/", (req, res) => {
  burger.all((data) => {
    let hbsObject = {
      burgers: data
    };

    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", (req, res) => {
  burger.insert(["burger_name"], [req.body.burger_name], (result) => {
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function (req, res) {
  let condition = `id = ${req.params.id}`;

  burger.update({ devoured: true }, condition, (result) => {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;