"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = healthCheck;
function healthCheck(req, res) {
    return res.json({ message: "Server is OK" });
}
