const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", (req, res) => {
  db.Burger.findAll({ include: { all: true } }).then(dbBurger => {
    let hbsObject = {
      burgers: dbBurger
    };

    res.render("index", hbsObject);
  });
});

router.get("/api/customers", (req, res) => {
  let burgerCountQuery = "(SELECT COUNT(*) FROM Burgers WHERE Burgers.CustomerId = Customer.id)"
  db.Customer.findAll(
    {
      attributes: {
        include: [[db.sequelize.literal(burgerCountQuery), "BurgersCount"]]
      },
      include: { all: true },
      order: db.sequelize.literal("BurgersCount DESC")
    }
  ).then(dbBurger => {
    res.json(dbBurger);
  });
});

router.post("/api/burgers", (req, res) => {
  db.Burger.create(req.body).then(dbBurger => {
    res.json(dbBurger);
  });
});

router.put("/api/burgers/:id", function (req, res) {
  db.Customer.findOrCreate(
    {
      where: req.body
    }
  ).spread(customer => {
    db.Burger.update(
      {
        devoured: true,
        CustomerId: customer.get().id
      },
      {
        where: { id: req.params.id }
      }
    ).then((dbBurger, affected) => {
      if (dbBurger[0] == 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
});

module.exports = router;