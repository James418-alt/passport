"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dbConfig_1 = require("./utils/dbConfig");
const main_1 = __importDefault(require("./main"));
const port = 2200;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: ["http://localhost:5175"] }));
app.use(express_1.default.json());
(0, main_1.default)(app);
app.listen(port, () => {
    (0, dbConfig_1.dbConfig)();
});
