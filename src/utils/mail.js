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
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
const { EMAIL_SERVICE, EMAIL_HOST, EMAIL_HOST_PASSWORD, EMAIL_HOST_USER, EMAIL_PORT, SITE_NAME, } = process.env;
class Mail {
    constructor() {
        this.transporter = this.getTransporter();
    }
    getTransporter() {
        return nodemailer_1.default.createTransport({
            service: EMAIL_SERVICE,
            host: EMAIL_HOST,
            port: parseInt(EMAIL_PORT, 10),
            secure: true,
            auth: {
                user: EMAIL_HOST_USER,
                pass: EMAIL_HOST_PASSWORD,
            },
        });
    }
    sendMail(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { subject, text, html } = message;
                const mailOptions = {
                    from: `Отправлено c сайта ${SITE_NAME} <${EMAIL_HOST_USER}>`,
                    to: EMAIL_HOST_USER,
                    subject: subject,
                    text: text,
                    html: html,
                };
                const info = yield this.transporter.sendMail(mailOptions);
                return info;
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.default = new Mail();
