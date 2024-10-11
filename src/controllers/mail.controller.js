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
exports.sendSimpleRequest = sendSimpleRequest;
exports.sendEstimateRequest = sendEstimateRequest;
exports.sendCallbackRequest = sendCallbackRequest;
const mail_1 = __importDefault(require("../utils/mail"));
function sendMessage(message, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const messageInfo = yield mail_1.default.sendMail(message);
            return res.status(200).json({
                message: "Message sent successfully",
                messageInfo: messageInfo,
            });
        }
        catch (err) {
            return res.status(500).json({
                message: "Internal Server Error!",
            });
        }
    });
}
function sendSimpleRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { type, firstName, lastName, companyName, phoneNumber, additionalInfo, } = req.body;
        const message = {
            subject: "Новая заявка",
            text: `Тип: ${type}, имя: ${firstName}, фамилия: ${lastName}, номер телефона: ${phoneNumber}, компания: 
    ${!!companyName ? companyName : "-"}, 
    дополнительная информация: "${!!additionalInfo ? additionalInfo : "-"}"`,
            html: `
    <p><span style="font-weight: bold">Тип: </span>${type}</p>
    <p><span style="font-weight: bold">Имя: </span>${firstName}</p>
    <p><span style="font-weight: bold">Фамилия: </span>${lastName}</p>
    <p><span style="font-weight: bold">Номер телефона: </span><a href="tel:${phoneNumber}">${phoneNumber}</a></p>
    <p><span style="font-weight: bold">Компания: </span>${!!companyName ? companyName : "не указано"}</p>
    <p><span style="font-weight: bold">Дополнительная информация: </span></p>
    <p>${!!additionalInfo ? additionalInfo : "не указано"}</p>`,
        };
        return yield sendMessage(message, res);
    });
}
function sendEstimateRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { type, firstName, lastName, companyName, phoneNumber, productDescription, count, preferredPrice, files, } = req.body;
        const message = {
            subject: "Новая заявка на бесплатный просчет",
            text: `Тип: ${type}, имя: ${firstName}, фамилия: ${lastName}, номер телефона: ${phoneNumber}, компания: 
    ${!!companyName ? companyName : "-"}, 
    описание товара: ${!!productDescription ? productDescription : "-"}, количество: ${count}, желаемая цена: ${preferredPrice}`,
            html: `
    <p><span style="font-weight: bold">Тип: </span>${type}</p>
    <p><span style="font-weight: bold">Имя: </span>${firstName}</p>
    <p><span style="font-weight: bold">Фамилия: </span>${lastName}</p>
    <p><span style="font-weight: bold">Номер телефона: </span><a href="tel:${phoneNumber}">${phoneNumber}</a></p>
    <p><span style="font-weight: bold">Компания: </span>${!!companyName ? companyName : "не указано"}</p>
    <p><span style="font-weight: bold">Описание товара: </span></p>
    <p>${!!productDescription ? productDescription : "не указано"}</p>
    <p><span style="font-weight: bold">Количество: </span>${count}</p>
    <p><span style="font-weight: bold">Желаемая цена: </span>${preferredPrice}</p>`,
        };
        return yield sendMessage(message, res);
    });
}
function sendCallbackRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { phoneNumber } = req.body;
        const message = {
            subject: "Новая заявка на обратный звонок",
            text: `Номер телефона: ${phoneNumber}`,
            html: `<p><span style="font-weight: bold">Номер телефона: </span><a href="tel:${phoneNumber}">${phoneNumber}</a></p>`,
        };
        return yield sendMessage(message, res);
    });
}
