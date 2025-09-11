import Cart from "../models/cartModel.js";

// Create a new cart for a user
export const createCartForUser = async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const cart = await Cart.create({
      userId,
      items: [],
      totalAmount: 0,
      status: "active",
    });

    console.log("[Cart] created:", cart._id, "for user:", userId);
    return res.status(201).json(cart);
  } catch (err) {
    console.error("[Cart] create error:", err);
    next(err); // pass error to your error handler middleware
  }
};
