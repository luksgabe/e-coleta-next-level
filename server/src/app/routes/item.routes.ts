import { ItemController } from "../controllers/item.controller";
import express, { Router } from "express";

export class ItemRoutes {
  private routes: Router;
  private controller: ItemController;

  constructor() {
    this.routes = express.Router();
    this.controller = new ItemController();
  }

  setRoutes(): Router {
    this.routes.get("/items", this.controller.index);
    return this.routes;
  }
}
