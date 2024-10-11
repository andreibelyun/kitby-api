import { Router } from "express";
import { healthCheck } from "../controllers/home.controller";

class HomeRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", (req, res) => {
      healthCheck(req, res);
    });
  }
}

export default new HomeRoutes().router;
