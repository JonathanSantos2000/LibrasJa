"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const database_config_1 = require("./configs/database.config");
const user_router_1 = __importDefault(require("./routers/user.router"));
const categorias_router_1 = __importDefault(require("./routers/categorias.router"));
const post_router_1 = __importDefault(require("./routers/post.router"));
(0, database_config_1.dbConnect)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:4200",
    credentials: true,
}));
// =========================
// API
// =========================
app.use("/api/user", user_router_1.default);
app.use("/api/categorias", categorias_router_1.default);
app.use("/api/posts", post_router_1.default);
// =========================
// UPLOADS
// =========================
app.use("/uploads", express_1.default.static(path_1.default.join(process.cwd(), "uploads")));
// =========================
// ANGULAR
// =========================
const frontendPath = path_1.default.join(process.cwd(), "built", "public", "browser");
app.use(express_1.default.static(frontendPath));
app.get("/{*splat}", (req, res) => {
    res.sendFile(path_1.default.join(frontendPath, "index.html"));
});
// =========================
// SERVER
// =========================
const port = 5000;
app.listen(port, () => {
    console.log(`Website served on http://localhost:${port}`);
});
