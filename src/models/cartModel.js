import mongoose, { Schema } from "mongoose";

// Define a schema for a single cart item
const cartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "product",   // must match your product model name
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
});

// Define the cart schema
const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",   // must match your user model name
      required: true,
    },
    items: [cartItemSchema],  // array of cart items
    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
  }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
