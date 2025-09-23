import express from "express";
import { addProduct, getProductById, getProducts } from "../controllers/productController.js";
import validateJWT from "../middlewares/validateJWT.js";

const router = express.Router();

// GET /api/products
router.get("/" , getProducts);

router.get("/:id", getProductById);

router.post("/", validateJWT, addProduct);

export default router;
