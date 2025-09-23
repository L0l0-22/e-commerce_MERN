import ('dotenv/config')
import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import swaggerUi from "swagger-ui-express"; 
import swaggerSpec from "./config/Swagger.js";   // 👈 import من الـ package بتاعك

const app = express();

// 🔹 Middlewares
app.use(express.json());     // parse JSON body
app.use(cors());             // allow cross-origin requests
app.use(morgan("dev"));      // log requests


// 🔹 Routes
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// بعد middlewares
app.use("/users", userRoutes);

app.use("/products", productRoutes);

app.use("/cart", cartRoutes);

app.use("/orders", orderRoutes);


// 🔹 404 handler (after all routes)
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// 🔹 Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

export default app; // ✅ use export default
