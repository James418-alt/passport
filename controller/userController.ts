import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";

import { sendEmail } from "../utils/emails/email";
import myUserModel from "../model/userModel";
import { forgetPassEmail } from "../utils/emails/forgetPassemail";

// export const createUser = async (req: Request, res: Response) => {
//   try {
//     const { password, email, name } = req.body;
//     const salt = await bcrypt.genSalt(10);
//     const hashed = await bcrypt.hash(password, salt);
//     const getD = await userModel.create({ email, name, password: hashed });
//     return res.status(200).json({
//       message: "User Created Successfully",
//       data: getD,
//     });
//   } catch (error: any) {
//     return res.status(400).json({
//       message: "Error Occured",
//       error: error.message,
//     });
//   }
// };

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await myUserModel.create({
      email,
      name,
      password: hashed,
      verifyToken: crypto.randomInt(0, 1000000),
    });
    sendEmail(user);
    res.status(201).json({ message: "created successfully", data: user });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { verifyToken } = req.body;
    const user = await myUserModel.findById(userID);
    if (user) {
      const tokenCheck = verifyToken === user?.verifyToken;
      if (tokenCheck) {
        const getD = await myUserModel.findByIdAndUpdate(
          userID,
          {
            verify: true,
            verifyToken: "",
          },
          { new: true }
        );

        res.status(200).json({
          message: "User Verified",
          data: getD,
        });
      } else {
        res.status(400).json({
          message: "Verify Token Incorrect",
        });
      }
    } else {
      res.status(400).json({
        message: "User not found",
      });
    }
  } catch (error: any) {
    res.status(400).json({
      message: "Error Occured",
      error: error.message,
    });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userExist = await myUserModel.findOne({ email });
    if (userExist) {
      const passCheck = await bcrypt.compare(password, userExist.password);
      if (passCheck) {
        res.status(200).json({
          message: "Login Successfully",
          data: userExist,
        });
      } else {
        res.status(400).json({
          message: "Incorrect Password",
        });
      }
    } else {
      res.status(400).json({
        message: "User not found",
      });
    }
  } catch (error: any) {
    res.status(400).json({
      message: "Error Occured",
      error: error.message,
    });
  }
};

export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const findUser = await myUserModel.findOne({ email });
    if (findUser) {
      forgetPassEmail(findUser);
      res.status(200).json({ message: "User found", data: findUser });
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(400).json({
      message: "Error Occured",
      error: error.message,
    });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { password } = req.body;
    const findUser = await myUserModel.findById(userID);

    if (findUser) {
      const passCheck = await bcrypt.compare(password, findUser.password);
      if (passCheck) {
        res.status(400).json({
          message: "You can't use same password",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        const getD = await myUserModel.findByIdAndUpdate(
          userID,
          {
            password: hashed,
          },
          { new: true }
        );

        res.status(200).json({
          message: "Password Changed",
          data: getD,
        });
      }
    } else {
      res.status(400).json({
        message: "User not found",
      });
    }
  } catch (error: any) {
    res.status(400).json({
      message: "Error Occured",
      error: error.message,
    });
  }
};
