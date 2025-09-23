

import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js"; // make sure path is correct
// import { seedInitialProducts } from "./controllers/productController.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); // ✅ connect to MongoDB first

    // 🔹 Call the seed function here
    // await seedInitialProducts();

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();
 