import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { google } from "googleapis";
import { iUserData } from "../../model/userModel";
const GOOGLE_REFRESH_TOKEN =
  "1//04IFsTNSRYpifCgYIARAAGAQSNwF-L9IrQtk-MlkfLoRPTLeP5FSOQzJrACcEX_eb1cJvCzxgPB2RN2lDMrOit74TF1YMMp4PVjs";

const GOOGLE_CLIENT =
  "76597312158-nvjq3tqe0489m3upu0flchdbu9tom9nt.apps.googleusercontent.com";

const GOOGLE_URL = "https://developers.google.com/oauthplayground";

const GOOGLE_SECRET_KEY = "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";
const USER_MAIL = "ghettodeveloper@gmail.com";

const LIVE_URL = `https://just-codify.web.app`;

const oAuth = new google.auth.OAuth2(
  GOOGLE_CLIENT,
  GOOGLE_SECRET_KEY,
  GOOGLE_URL
);
oAuth.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

export const sendEmail = async (user: iUserData) => {
  try {
    const accessToken: any = (await oAuth.getAccessToken()).token;
    const JSON_SECRET = `lmjkiuytrfopukloiiauyietfv`;
    const token = jwt.sign({ id: user?._id }, JSON_SECRET, {
      expiresIn: "2d",
    });

    const url = `${LIVE_URL}/verify-account/${token}`;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: USER_MAIL,
        clientId: GOOGLE_CLIENT,
        clientSecret: GOOGLE_SECRET_KEY,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken,
      },
    });

    const mailOptions = {
      from: `GhettoDev <${USER_MAIL}>`,
      to: user?.email,
      subject: "Test Email",
      text: `Hello ${user.name} this is a test email`,
      html: `<h1>Hello ${user?.name}</h1>`,
    };

    await transporter.sendMail(mailOptions).then(() => {
      console.log("Email sent successfully");
    });
  } catch (error) {}
};
