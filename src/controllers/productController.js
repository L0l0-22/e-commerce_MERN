import productModal from "../models/ProductModel.js";

// HTTP controller (Express handler)
export const getProducts = async (req, res, next) => {
  try {
     const products = await productModal.find();

    // map products and add sequential id
    const productsWithIndex = products.map((p, idx) => ({
      id: idx + 1,  // 👈 1,2,3,...
      title: p.title,
      image: p.image,
      price: p.price,
      stock: p.stock,
    }));
    res.status(200).json(productsWithIndex);
  } catch (err) {
    next(err); // let the global error handler respond
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const products = await productModal.findById(id);

     const idx = parseInt(id, 10) - 1; // convert "1" -> 0, "2" -> 1
    if (idx < 0 || idx >= products.length) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = {
      id: idx + 1,
      title: products[idx].title,
      image: products[idx].image,
      price: products[idx].price,
      stock: products[idx].stock,
    };

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

// ✅ Add new product (dynamic)
export const addProduct = async (req, res, next) => {
  try {
    const { title, image, price, stock } = req.body;

    if (!title || !image || !price || stock == null) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = new productModal({ title, image, price, stock });
    await product.save();

    res.status(201).json({
      message: "Product created successfully",
      product: {
        id: count, // sequential number
        title: product.title,
        image: product.image,
        price: product.price,
        stock: product.stock,
      },
    });
  } catch (err) {
    next(err);
  }
};
