import express from "express";
import validateJWT from "../middlewares/validateJWT.js";
import { getUserOrders } from "../controllers/orderController.js";

const router = express.Router();

// protect with JWT
router.get("/", validateJWT, getUserOrders);

export default router;
