import mongoose, { Schema } from "mongoose";

const orderItemSchema = new Schema({
    product: {
    type: Schema.Types.ObjectId,
    ref: "product",   // must match your product model name
    required: true,
  },
  title: { 
    type: String,
    required: true 
  }, 
  image: { 
    type: String, 
    required: true 
  },
  quantity: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  subtotal: {
    type: Number , 
    required: true,
  }
});

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema],
    totalAmount: { 
        type: Number, 
        required: true 
    },
    shippingAddress: { 
        type: String 
    }, 
    paymentMethod: { 
        type: String, 
        enum: ["cash", "credit", "paypal"], 
        default: "cash" 
    },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);


const Order = mongoose.model("Order", orderSchema);

export default Order;
