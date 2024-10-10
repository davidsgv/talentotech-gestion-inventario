const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController")

router.post("/", controller.CreateProduct);
router.get("/", controller.GetProducts);
router.get("/:id", controller.GetProductById);

module.exports = router;