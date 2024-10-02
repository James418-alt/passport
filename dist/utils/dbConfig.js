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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const console_1 = require("console");
const mongoose_1 = require("mongoose");
const url = "mongodb+srv://ebifegha123:ebifegha123@gomenticode.1l9lbmv.mongodb.net/passportDB?retryWrites=true&w=majority&appName=GomentiCode";
const dbConfig = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoose_1.connect)(url).then(() => {
        (0, console_1.clear)(), console.log("Server up");
    });
});
exports.dbConfig = dbConfig;
