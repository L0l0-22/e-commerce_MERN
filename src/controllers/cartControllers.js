// controllers/cartControllers.js
import Cart from "../models/cartModel.js";
import productModal from "../models/ProductModel.js";

// shared helper (no req/res)
  const makeNewCart = (userId) =>
  Cart.create({ userId, items: [], totalAmount: 0, status: "active" });

  const calculateCartTotalItems = (cart)=>{
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
  };

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

// post /api/cart/:userId
export const addItemToCart = async (req, res , next) => {
  try {
    const userId = req.user._id; // ✅ comes from JWT middleware
    const { productId, quantity } = req.body;

    if (!userId) return res.status(400).json({ message: "userId is required" });
    if (!productId) return res.status(400).json({ message: "productId is required" });

    // ✅ Check if user already has an active cart
    let cart = await Cart.findOne({ userId, status: "active" });
    if (!cart) {
      cart = await Cart.create({ userId, items: [], totalAmount: 0, status: "active" });
    }

    // ✅ Check if product exists
    const product = await productModal.findById(productId);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    if (product.stock < quantity){
      return res.status(400).json({ message: "No stock available for this item" });
    }

     // ✅ Check if item already exists in cart
    const existingItem = cart.items.find((item) => item.product.toString() === productId);
      if (existingItem) {
        // update quantity
        const newTotalQty = existingItem.quantity + quantity;

      if (newTotalQty > product.stock) {
        return res.status(400).json({
          message: `Low stock. Available: ${product.stock}, you are trying to set: ${newTotalQty}`,
        });
      }

      existingItem.quantity = newTotalQty;
      } else {
        if (quantity > product.stock) {
          return res.status(400).json({
            message: `Low stock. Available: ${product.stock}, you are trying to request: ${quantity}`,
          });
        }
      // push new item
      cart.items.push({
        product: productId,
        quantity,
        unitPrice: product.price, // assuming Product has a "price" field
      });
    }

    // ✅ Recalculate total
    cart.totalAmount = calculateCartTotalItems(cart);
    await cart.save();

    return res.status(200).json(cart);
  } catch (err) {
    console.error("[Cart] get active error:", err);
    next(err);
  }
};

// put /api/cart/:userId
export const updateCartItem = async (req, res , next) => {
  try {
    const userId = req.user._id; // ✅ comes from JWT middleware
    const { productId, quantity } = req.body;

    if (!userId) return res.status(400).json({ message: "userId is required" });
    if (!productId) return res.status(400).json({ message: "productId is required" });

    // ✅ Check if user already has an active cart
    let cart = await Cart.findOne({ userId, status: "active" });

    if (!cart) {
      cart = await Cart.create({ userId, items: [], totalAmount: 0, status: "active" });
    }

    // ✅ Check if product exists
    const product = await productModal.findById(productId);
    if (!product) {
      return res.status(400).json({ message: "Item not found" });
    }

    if (product.stock < quantity){
      return res.status(400).json({ message: "No stock available for this item" });
    }

     // ✅ Check if item already exists in cart
    const item = cart.items.find((i) => i.product.toString() === productId);
    if (!item) {
      return res.status(404).json({ message: "Item not in cart" });
    }

    if (quantity === 0) {
      // remove item
      cart.items = cart.items.filter((i) => i.product.toString() !== productId);
    } else {
      // update quantity
      item.quantity = quantity;
    }

    // recalc total
    cart.totalAmount = calculateCartTotalItems(cart);
    await cart.save();

    return res.status(200).json(cart);

  } catch (err) {
    console.error("[Cart] update error:", err);
    next(err);
  }
};

// delete /api/cart/:userId
export const deleteCartItem = async (req, res , next) => {
  try {
    const userId = req.user._id; // ✅ comes from JWT middleware
    const { productId } = req.params ;

    if (!userId) return res.status(400).json({ message: "userId is required" });
    if (!productId) return res.status(400).json({ message: "productId is required" });

    // ✅ Check if user already has an active cart
    let cart = await Cart.findOne({ userId, status: "active" });
    if (!cart) {
      cart = await Cart.create({ userId, items: [], totalAmount: 0, status: "active" });
    }

    // ✅ Check if item already exists in cart
    const itemIndex = cart.items.findIndex((i) => i.product.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not in cart" });
    }
    cart.items.splice(itemIndex, 1);

    // recalc total
    cart.totalAmount = calculateCartTotalItems(cart);
    await cart.save();

    return res.status(200).json(cart);

  } catch (err) {
    console.error("[Cart] delete error:", err);
    next(err);
  }
};

// delete /api/cart/
export const clearCart = async (req, res , next) => {
  try {
    const userId = req.user._id; // ✅ comes from JWT middleware

    if (!userId) return res.status(400).json({ message: "userId is required" });

    // ✅ Check if user already has an active cart
    let cart = await Cart.findOne({ userId, status: "active" });
    if (!cart) {
      return res.status(404).json({ message: "Active cart not found" });
    }

    // ✅ clear items & reset total
    cart.items = [];
    cart.totalAmount = 0;

    await cart.save();

    return res.status(200).json({ message: "Cart cleared successfully", cart });

  } catch (err) {
    console.error("[Cart] clear error:", err);
    next(err);
  }
};