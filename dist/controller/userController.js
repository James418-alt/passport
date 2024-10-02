"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.forgetPassword = exports.signInUser = exports.verifyUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const email_1 = require("../utils/emails/email");
const userModel_1 = __importDefault(require("../model/userModel"));
const forgetPassemail_1 = require("../utils/emails/forgetPassemail");
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
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        const user = yield userModel_1.default.create({
            email,
            name,
            password: hashed,
            verifyToken: crypto_1.default.randomInt(0, 1000000),
        });
        (0, email_1.sendEmail)(user);
        res.status(201).json({ message: "created successfully", data: user });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.createUser = createUser;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { verifyToken } = req.body;
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            const tokenCheck = verifyToken === (user === null || user === void 0 ? void 0 : user.verifyToken);
            if (tokenCheck) {
                const getD = yield userModel_1.default.findByIdAndUpdate(userID, {
                    verify: true,
                    verifyToken: "",
                }, { new: true });
                res.status(200).json({
                    message: "User Verified",
                    data: getD,
                });
            }
            else {
                res.status(400).json({
                    message: "Verify Token Incorrect",
                });
            }
        }
        else {
            res.status(400).json({
                message: "User not found",
            });
        }
    }
    catch (error) {
        res.status(400).json({
            message: "Error Occured",
            error: error.message,
        });
    }
});
exports.verifyUser = verifyUser;
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userExist = yield userModel_1.default.findOne({ email });
        if (userExist) {
            const passCheck = yield bcrypt_1.default.compare(password, userExist.password);
            if (passCheck) {
                res.status(200).json({
                    message: "Login Successfully",
                    data: userExist,
                });
            }
            else {
                res.status(400).json({
                    message: "Incorrect Password",
                });
            }
        }
        else {
            res.status(400).json({
                message: "User not found",
            });
        }
    }
    catch (error) {
        res.status(400).json({
            message: "Error Occured",
            error: error.message,
        });
    }
});
exports.signInUser = signInUser;
const forgetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const findUser = yield userModel_1.default.findOne({ email });
        if (findUser) {
            (0, forgetPassemail_1.forgetPassEmail)(findUser);
            res.status(200).json({ message: "User found", data: findUser });
        }
        else {
            res.status(400).json({ message: "User not found" });
        }
    }
    catch (error) {
        res.status(400).json({
            message: "Error Occured",
            error: error.message,
        });
    }
});
exports.forgetPassword = forgetPassword;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { password } = req.body;
        const findUser = yield userModel_1.default.findById(userID);
        if (findUser) {
            const passCheck = yield bcrypt_1.default.compare(password, findUser.password);
            if (passCheck) {
                res.status(400).json({
                    message: "You can't use same password",
                });
            }
            else {
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashed = yield bcrypt_1.default.hash(password, salt);
                const getD = yield userModel_1.default.findByIdAndUpdate(userID, {
                    password: hashed,
                }, { new: true });
                res.status(200).json({
                    message: "Password Changed",
                    data: getD,
                });
            }
        }
        else {
            res.status(400).json({
                message: "User not found",
            });
        }
    }
    catch (error) {
        res.status(400).json({
            message: "Error Occured",
            error: error.message,
        });
    }
});
exports.changePassword = changePassword;
