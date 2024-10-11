"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const home_routes_1 = __importDefault(require("./home.routes"));
const mail_routes_1 = __importDefault(require("./mail.routes"));
class Routes {
    constructor(app) {
        app.use("/api", home_routes_1.default);
        app.use("/api/mail", mail_routes_1.default);
    }
}
exports.default = Routes;
