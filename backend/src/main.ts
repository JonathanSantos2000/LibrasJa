import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { dbConnect } from "./configs/database.config";
import userRoutes from "./routers/user.router";
import path from "path";

dbConnect();

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use("/api/user", userRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const port = 5000;
app.listen(port, () => {
  console.log("website served on http://localhost:" + port);
});
