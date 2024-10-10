const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController")

router.post("/", controller.CreateProduct);

module.exports = router;