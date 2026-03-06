const express = require("express");
const router = express.Router();
const cardsController = require("../controllers/cardsController");

router.get("/", cardsController.index);
router.get("/new", cardsController.newCard);
router.post("/", cardsController.create);
router.get("/:id", cardsController.show);
router.get("/:id/edit", cardsController.edit);
router.post("/:id/edit", cardsController.update);
router.post("/:id/delete", cardsController.destroy);

module.exports = router;