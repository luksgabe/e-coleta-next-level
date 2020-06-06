import knex from "../../infra/database/connection";
import { Request, Response } from "express";

import { PointDto } from "../../domain/dtos/point.dto";

export class PointController {
  async index(request: Request<any>, response: Response<any>) {
    const { city, uf, items = "" } = request.query;

    const parsedItems = items
      .toString()
      .split(",")
      .map(item => +item.trim());

    const points = await knex("point")
      .join("point_items", "point.id", "=", "point_items.point_id")
      .whereIn("point_items.item_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("point.*");

    return response.json(points);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex("point")
      .where("id", id)
      .first();

    if (!point) {
      return response.status(400).json({
        message: "Point not found"
      });
    }

    const items = await knex("item")
      .join("point_items", "item.id", "=", "point_items.item_id")
      .where("point_items.point_id", id)
      .select("item.title");

    return response.json({ point, items });
  }

  async create(request: Request, response: Response) {
    try {
      // const pointDto = new PointDto(request.body);
      // pointDto.image = 'image-fake';

      const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items
      } = request.body;

      const trx = await knex.transaction();

      const point = {
        image:
          "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
      };

      const insertedIds = await trx("point").insert(point);
      const point_id = insertedIds[0];

      const pointItems = items.map((item_id: number) => {
        return {
          item_id,
          point_id: insertedIds[0]
        };
      });

      await trx("point_items").insert(pointItems);
      await trx.commit();

      return response.json({ id: point_id, ...point });
    } catch (err) {
      return response.status(400).json({ message: err.toString() });
    }
  }
}
