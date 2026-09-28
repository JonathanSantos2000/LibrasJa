import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";

import { dbConnect } from "./configs/database.config";

import userRoutes from "./routers/user.router";
import categoriasRoutes from "./routers/categorias.router";
import postsRoutes from "./routers/post.router";

dbConnect();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  }),
);

// =========================
// API
// =========================

app.use("/api/user", userRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/posts", postsRoutes);

// =========================
// UPLOADS
// =========================

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// =========================
// ANGULAR
// =========================

const frontendPath = path.join(process.cwd(), "built", "public", "browser");

app.use(express.static(frontendPath));

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// =========================
// SERVER
// =========================

const port = 5000;

app.listen(port, () => {
  console.log(`Website served on http://localhost:${port}`);
});
