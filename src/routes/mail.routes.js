"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mail_controller_1 = require("../controllers/mail.controller");
class MailRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.post("/simple-request", (req, res) => {
            (0, mail_controller_1.sendSimpleRequest)(req, res);
        });
        this.router.post("/estimate-request", (req, res) => {
            (0, mail_controller_1.sendEstimateRequest)(req, res);
        });
        this.router.post("/callback-request", (req, res) => {
            (0, mail_controller_1.sendCallbackRequest)(req, res);
        });
    }
}
exports.default = new MailRoutes().router;
