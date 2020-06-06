import { Request, Response } from "express";
import knex from "../../infra/database/connection";

export class ItemController {
  async index(req: Request<any>, res: Response<any>) {
    const items = await knex("item").select("*");

    const serializedItem = items.map(item => {
      return {
        name: item.title,
        image_url: `http://localhost:3333/uploads/${item.image}`
      };
    });

    return res.json(serializedItem);
  }
}
