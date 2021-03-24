import { StatusCodes } from 'http-status-codes';
import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Inventory } from '../models/Inventory';

@Controller('create-inventory')
export class InventoryController {
  @Post()
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
        })
        const inventory = new Inventory(inventoryDerived);
        inventory.save();
    }
    return res.status(StatusCodes.OK).json({
        Result: 'Success'
    });
  }
}