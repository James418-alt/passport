"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userModel = new mongoose_1.Schema({
    name: { type: String, require: true },
    email: { type: String, unique: true },
    password: { type: String, require: true },
    verify: { type: Boolean, default: false },
    verifyToken: { type: String },
}, { timestamps: true });
const myUserModel = (0, mongoose_1.model)("users", userModel);
exports.default = myUserModel;
