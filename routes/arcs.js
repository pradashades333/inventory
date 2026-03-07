const express = require("express");
const router = express.Router();
const arcsController = require("../controllers/arcsController");

router.get("/", arcsController.index);
router.get("/new", arcsController.newArc);
router.post("/", arcsController.create);
router.get("/:id", arcsController.show);
router.get("/:id/edit", arcsController.edit);
router.post("/:id/edit", arcsController.update);
router.post("/:id/delete", arcsController.destroy);

module.exports = router;