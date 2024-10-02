import express, { Request, Response } from "express";
import cors from "cors";
import { dbConfig } from "./utils/dbConfig";

import mainApp from "./main";
const port = 2200;

const app = express();
app.use(cors({ origin: ["http://localhost:5175"] }));
app.use(express.json());
mainApp(app);
app.listen(port, () => {
  dbConfig();
});
