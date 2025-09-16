import express from "express";
import { createCartForUser, getUserActiveCart } from "../controllers/cartControllers.js";
import validateJWT from "../middlewares/validateJWT.js";

const router = express.Router();
// TO DO: get userId from jwt , after validating from the middleware 
router.post("/", validateJWT , createCartForUser);    // POST /api/cart  { "userId": "..." }  ' order is important'
router.get("/:userId", validateJWT , getUserActiveCart); // GET  /api/cart/:userId

export default router;
