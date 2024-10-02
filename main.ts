import { Application, Request, Response } from "express";
import router from "./router/router";

const mainApp = (app: Application) => {
  try {
    const defaultRoute = async (req: Request, res: Response) => {
      try {
        return res.status(200).json({
          message: "Welcome to default route",
        });
      } catch (error: any) {
        return res.status(400).json({
          message: "Error OCcured",
        });
      }
    };
    app.use("/api", router);
  } catch (error: any) {
    console.log(error);
  }
};

export default mainApp;
