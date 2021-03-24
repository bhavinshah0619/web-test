import { StatusCodes } from 'http-status-codes';
import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Inventory } from '../models/Inventory';
import { Op } from "sequelize";
import { get } from 'http';

@Controller('inventory')
export class InventoryController {
  @Post('add')
  private add(req: Request, res: Response) {
    console.log(req.body);
    // TODO: Error Checking, UI is not enough
    let reqBody = req.body;
    let start = reqBody.timecodeBegin;
    let stop = reqBody.timecodeEnd;
    if (start > stop) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            Result: 'Failure',
        });       
    }
    // TODO: Bulk Insert
    for (let i = start; i <= stop; i++) {
        let inventoryDerived = {
          capacity: reqBody.capacity,
          available: reqBody.capacity,
          date: reqBody.date,
          timecode: i
        }
        // Not most ideal way to update. 
        // TODO: Find a better way to update.
        Inventory.destroy({
          where: {
            date: inventoryDerived.date,
            timecode: inventoryDerived.timecode
          }
        });
        const inventory = new Inventory(inventoryDerived);
        inventory.save();
    }
    return res.status(StatusCodes.OK).json({
        Result: 'Success'
    });
  }

  @Post('query')
  private async get(req: Request, res: Response) {
    let reqBody = req.body;
    let start = reqBody.timecodeBegin;
    let stop = reqBody.timecodeEnd;

    if (start > stop) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            Result: 'Failure',
        });       
    }
    const sum = await Inventory.sum('available', { 
      where: { 
        date: reqBody.date,
        timecode: {
          [Op.gte]: start,
          [Op.lte]: stop
        }
      } 
    });
    console.log("InventoryController ", sum);
    return res.status(StatusCodes.OK).json({
      Result: 'Success',
      sum: sum
  });
  }
}