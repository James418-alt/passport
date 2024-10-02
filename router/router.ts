import { Request, Response, Router } from "express";
import {
  changePassword,
  createUser,
  forgetPassword,
  signInUser,
  verifyUser,
} from "../controller/userController";

const router = Router();
router.post("/register", createUser);
router.post("/signin", signInUser);
router.patch("/verify/:userID", verifyUser);
router.patch("/change-pass/:userID", changePassword);
router.post("/forgetpass", forgetPassword);

export default router;
