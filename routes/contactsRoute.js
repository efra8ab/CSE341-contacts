const express = require("express");
const contactsController = require("../controllers/contactsController");

const router = express.Router();

router.get("/", contactsController.getAll);
router.get("/:id", contactsController.getOne);

module.exports = router;
