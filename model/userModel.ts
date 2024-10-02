import { Document, model, Schema } from "mongoose";
interface iUser {
  name: string;
  email: string;
  password: string;
  verify: boolean;
  verifyToken: string | null;
}
export interface iUserData extends iUser, Document {}
const userModel = new Schema<iUserData>(
  {
    name: { type: String, require: true },
    email: { type: String, unique: true },
    password: { type: String, require: true },
    verify: { type: Boolean, default: false },
    verifyToken: { type: String },
  },
  { timestamps: true }
);

const myUserModel = model<iUserData>("users", userModel);
export default myUserModel;
