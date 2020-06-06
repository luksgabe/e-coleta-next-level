import express, { Router } from "express";
import { PointController } from "../controllers/point.controller";

export class PointRoutes {
  private routes: Router;
  private controller: PointController;

  constructor() {
    this.routes = express.Router();
    this.controller = new PointController();
  }

  set(): Router {
    this.routes.post("/points", this.controller.create);
    this.routes.get("/points", this.controller.index);
    this.routes.get("/points/:id", this.controller.show);
    return this.routes;
  }
}
