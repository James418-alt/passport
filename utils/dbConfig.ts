import { clear } from "console";
import { connect } from "mongoose";
const url =
  "mongodb+srv://ebifegha123:ebifegha123@gomenticode.1l9lbmv.mongodb.net/passportDB?retryWrites=true&w=majority&appName=GomentiCode";
export const dbConfig = async () => {
  await connect(url).then(() => {
    clear(), console.log("Server up");
  });
};
