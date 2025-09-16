// controllers/cartControllers.js
import Cart from "../models/cartModel.js";

// shared helper (no req/res)
const makeNewCart = (userId) =>
  Cart.create({ userId, items: [], totalAmount: 0, status: "active" });

// POST /api/cart
export const createCartForUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    if (!userId) return res.status(400).json({ message: "userId is required" });

    const cart = await makeNewCart(userId);
    console.log("[Cart] created:", cart._id, "for user:", userId);
    return res.status(201).json(cart);
  } catch (err) {
    console.error("[Cart] create error:", err);
    next(err);
  }
};

// GET /api/cart/:userId
export const getUserActiveCart = async (req, res, next) => {
  try {
    const userId = req.user._id; // ✅ comes from JWT middleware

    if (!userId) return res.status(400).json({ message: "userId is required" });

    let cart = await Cart.findOne({ userId, status: "active" });
    if (!cart) {
      cart = await makeNewCart(userId);              // ✅ reuse, no duplication
      console.log("[Cart] no active cart, created new:", cart._id);
    } else {
      console.log("[Cart] found active cart:", cart._id);
    }

    return res.status(200).json(cart);
  } catch (err) {
    console.error("[Cart] get active error:", err);
    next(err);
  }
};
