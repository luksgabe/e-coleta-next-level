import express, { Router } from "express";
import { ItemRoutes } from "./item.routes";

const routes = express.Router();

routes.get("/", (request, response) => {
  return response.json({ message: "Hello World" });
});

export class Route {
  protected router: Router;
  public listRoutes: Router[];

  constructor() {
    this.router = routes;
    this.listRoutes = this.getRoutes();
  }

  getRoutes(): Router[] {
    const itemRoutes = new ItemRoutes();

    const list = [this.router, itemRoutes.setRoutes()];
    return list;
  }
}
