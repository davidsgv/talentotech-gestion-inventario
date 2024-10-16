const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController")
const permissionMiddleware = require("../middlewares/permissionMiddleware");

router.post("/", permissionMiddleware('create_product'), controller.CreateProduct);
router.get("/", permissionMiddleware('get_product'), controller.GetProducts);
router.get("/:id", permissionMiddleware('get_product'), controller.GetProductById);
router.put("/:id", permissionMiddleware('update_product'), controller.UpdateProduct);
router.delete("/:id", permissionMiddleware('delete_product'), controller.DeleteProduct);

router.get("/:id/history", permissionMiddleware('update_product'), controller.GetProductHistoryById);

module.exports = router;