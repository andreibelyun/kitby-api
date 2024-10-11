import { Router } from "express";
import {
  sendCallbackRequest,
  sendEstimateRequest,
  sendSimpleRequest,
} from "../controllers/mail.controller";

class MailRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/simple-request", (req, res) => {
      sendSimpleRequest(req, res);
    });
    this.router.post("/estimate-request", (req, res) => {
      sendEstimateRequest(req, res);
    });
    this.router.post("/callback-request", (req, res) => {
      sendCallbackRequest(req, res);
    });
  }
}

export default new MailRoutes().router;
