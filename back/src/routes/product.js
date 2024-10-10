const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController")

router.post("/", controller.CreateProduct);
router.get("/", controller.GetProducts);
router.get("/:id", controller.GetProductById);
router.put("/:id", controller.UpdateProduct);
router.delete("/:id", controller.DeleteProduct);

router.get("/:id/history", controller.GetProductHistoryById);

module.exports = router;