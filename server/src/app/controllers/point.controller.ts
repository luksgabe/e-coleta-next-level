import knex from "../../infra/database/connection";
import { Request, Response } from "express";

import { PointDto } from '../../domain/dtos/point.dto';

export class PointController {
  // async index(req: Request<any>, res: Response<any>) {
  // }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex('point').where('id', id).first();

    if(!point) {
      return response.status(400).json({
        message: 'Point not found'
      })
    }

    const items = await knex("item")
      .join("point_items", "item.id", "=", "point_items.item_id")
      .where("point_items.point_id", id)
      .select("item.title");

    return response.json({point, items});
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
        image: 'image-fake',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
      }

      const insertedIds = await trx('point').insert(point);
      const point_id = insertedIds[0];

      const pointItems = items.map((item_id: number) => {
        return {
          item_id,
          point_id: insertedIds[0]
        }
      });
  
      await trx('point_items').insert(pointItems);

      return response.json({id: point_id, ...point})
    } catch(err) {
      return response.status(400).json({ message: err.toString() })
    }

  }
}
