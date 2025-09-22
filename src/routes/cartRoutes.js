import express from "express";
import { addItemToCart, clearCart, createCartForUser, deleteCartItem, getUserActiveCart, updateCartItem } from "../controllers/cartControllers.js";
import validateJWT from "../middlewares/validateJWT.js";

const router = express.Router();
// TO DO: get userId from jwt , after validating from the middleware 
router.post("/", validateJWT , createCartForUser);    // POST /api/cart  { "userId": "..." }  ' order is important'

router.get("/:userId", validateJWT , getUserActiveCart); // GET  /api/cart/:userId

router.post('/items' , validateJWT , addItemToCart );   // POST /api/cart/items

router.put('/items' , validateJWT , updateCartItem );   // put /api/cart/items

router.delete('/items/:productId' , validateJWT , deleteCartItem );   // delete /api/cart/items/:productId

router.delete('/clear' , validateJWT , clearCart );   // delete /api/cart


export default router;
