import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimiter from "./middleware/rateLimit.middleware.js"
import cookieParser from "cookie-parser";
import blogRoutes from "./routes/blog.routes.js";
import authRoutes from "./routes/auth.routes.js";
import commentsRoutes from "./routes/comment.routes.js";
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
app.use(rateLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentsRoutes);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Blog API Documentation",
  })
);

app.listen(PORT, async () => {
  try {
    await connectDb(DB_URL);
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  } catch (error) {
    console.error("Cannot connect to the database: ", error.message);
  }
});
