import { clear } from "console";
import { connect } from "mongoose";
const url = "mongodb://localhost:27017/passportDb";
export const dbConfig = async () => {
  await connect(url).then(() => {
    clear(), console.log("Server up");
  });
};
