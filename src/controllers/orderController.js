import Order from "../models/orderModel.js";

// GET /api/orders
export const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.user._id; // comes from JWT middleware

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    // ✅ Fetch orders for this user, most recent first
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (err) {
    console.error("[Order] getUserOrders error:", err);
    next(err);
  }
};
