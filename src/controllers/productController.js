import productModal from "../models/ProductModel.js";

//hna na 7ta el data static w hnady 3liha lkn f el 3ady b3ml endpoint b 5ly el user y add data dynamic 

//service function that just queries Mongo.
export const getAllProducts = async () =>{
    return await productModal.find();
} 

// HTTP controller (Express handler)
export const getProducts = async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    next(err); // let the global error handler respond
  }
};

//one-time seeding logic (insert if empty).
export const seedInitialProducts = async () =>{
    const products = [
    {
        title: "Wireless Mouse",
        image: "https://picsum.photos/seed/mouse/600/400",
        price: 25.99,
        stock: 50,
    },
    {
        title: "Mechanical Keyboard",
        image: "https://picsum.photos/seed/keyboard/600/400",
        price: 79.99,
        stock: 30,
    },
    {
        title: "HD Monitor",
        image: "https://picsum.photos/seed/monitor/800/600",
        price: 149.99,
        stock: 20,
    },
    {
        title: "USB-C Hub",
        image: "https://placehold.co/600x400?text=USB-C+Hub",
        price: 39.99,
        stock: 100,
    },
    {
        title: "Bluetooth Headphones",
        image: "https://fpoimg.com/600x400?bg_color=222222&text_color=ffffff&text=Headphones",
        price: 59.99,
        stock: 75,
    },
    ];

    const existingProducts = await getAllProducts();

    if (existingProducts.length === 0) {
        await productModal.insertMany(products);
        console.log("✅ Products seeded successfully");
    } else {
        console.log("ℹ️ Products already exist — skipping seeding");
    }

}