import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { dbConnect } from "./configs/database.config";
import userRoutes from "./routers/user.router";
import categoriasRoutes from "./routers/categorias.router";
import postsRoutes from "./routers/post.router";
import path from "path";

dbConnect();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  }),
);

app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.originalUrl);
  next();
});

app.use("/api/user", userRoutes);

app.use("/api/categorias", categoriasRoutes);
app.use("/api/posts", postsRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const port = 5000;
app.listen(port, () => {
  console.log("website served on http://localhost:" + port);
});
