"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const router = (0, express_1.Router)();
router.post("/register", userController_1.createUser);
router.post("/signin", userController_1.signInUser);
router.patch("/verify/:userID", userController_1.verifyUser);
router.patch("/change-pass/:userID", userController_1.changePassword);
router.post("/forgetpass", userController_1.forgetPassword);
exports.default = router;
