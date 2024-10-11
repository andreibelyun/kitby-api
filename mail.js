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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Mail_instances, _Mail_transporter, _Mail_getTransporter;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
const { EMAIL_SERVICE, EMAIL_HOST, EMAIL_HOST_PASSWORD, EMAIL_HOST_USER, EMAIL_PORT, SITE_NAME, } = process.env;
class Mail {
    constructor() {
        _Mail_instances.add(this);
        _Mail_transporter.set(this, null);
        __classPrivateFieldSet(this, _Mail_transporter, __classPrivateFieldGet(this, _Mail_instances, "m", _Mail_getTransporter).call(this), "f");
    }
    send(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const info = yield __classPrivateFieldGet(this, _Mail_transporter, "f").sendMail({
                    from: `Отправлено c сайта ${SITE_NAME} <${EMAIL_HOST_USER}>`,
                    to: EMAIL_HOST_USER,
                    subject: "Новая заявка",
                    text: message,
                    html: `<b>${message}</b>`,
                }, (error, info) => {
                    if (error) {
                        console.error(" Ошибка отправки письма: ", error);
                    }
                    else {
                        console.log("Письмо отправлено: ", info.response);
                    }
                });
                return info.messageId;
            }
            catch (err) {
                return err;
            }
        });
    }
}
_Mail_transporter = new WeakMap(), _Mail_instances = new WeakSet(), _Mail_getTransporter = function _Mail_getTransporter() {
    return nodemailer_1.default.createTransport({
        service: EMAIL_SERVICE,
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: true,
        auth: {
            user: EMAIL_HOST_USER,
            pass: EMAIL_HOST_PASSWORD,
        },
    });
};
exports.default = new Mail();
