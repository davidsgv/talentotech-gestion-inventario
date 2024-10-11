const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController")
const { verificarPermiso } = require("../middlewares/authMiddleware");

router.post("/",verificarPermiso('create_product'), controller.CreateProduct);
router.get("/", controller.GetProducts);
router.get("/:id", controller.GetProductById);
router.put("/:id",verificarPermiso('update_product'), controller.UpdateProduct);
router.delete("/:id", verificarPermiso('delete_product'), controller.DeleteProduct);

router.get("/:id/history", controller.GetProductHistoryById);

module.exports = router;


