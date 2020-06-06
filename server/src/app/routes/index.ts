import express, { Router } from "express";
import { ItemRoutes } from "./item.routes";
import { PointRoutes } from './point.routes';

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
    const pointRoutes = new PointRoutes();

    const list = [this.router, itemRoutes.set(), pointRoutes.set()];
    return list;
  }
}
