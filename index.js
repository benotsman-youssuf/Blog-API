import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import blogRoutes from "./routes/blog.routes.js";
import authRoutes from "./routes/auth.routes.js";
import connectDb from "./db/connectDB.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swagger.config.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Blog API Documentation",
  })
);

connectDb(DB_URL);

app.listen(PORT, () => {
  console.log(`Server up on http://localhost:${PORT}`);
});
