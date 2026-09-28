"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
const mongoose_1 = require("mongoose");
const dbConnect = () => {
    (0, mongoose_1.connect)(process.env.MONGO_URI, {}).then(() => console.log("Connect Succesfully"), (error) => console.log(error));
};
exports.dbConnect = dbConnect;
