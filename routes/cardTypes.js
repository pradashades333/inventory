const express = require("express");
const router = express.Router();
const cardTypesController = require("../controllers/cardTypesController");

router.get("/", cardTypesController.index);
router.get("/new", cardTypesController.newCardType);
router.post("/", cardTypesController.create);
router.get("/:id", cardTypesController.show);
router.get("/:id/edit", cardTypesController.edit);
router.post("/:id/edit", cardTypesController.update);
router.post("/:id/delete", cardTypesController.destroy);

module.exports = router;