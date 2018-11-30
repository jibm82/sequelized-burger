const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", (req, res) => {
  db.Burger.findAll({}).then(dbBurger => {
    let hbsObject = {
      burgers: dbBurger
    };

    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", (req, res) => {
  db.Burger.create(req.body).then(dbBurger => {
    res.json(dbBurger);
  });
});

router.put("/api/burgers/:id", function (req, res) {
  db.Burger.update(
    { devoured: true },
    { where: { id: req.params.id } }
  ).then((dbBurger, affected) => {
    if (dbBurger[0] == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;