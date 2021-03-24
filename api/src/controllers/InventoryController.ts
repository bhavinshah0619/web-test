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
    let start = reqBody.timeCodeBegin;
    let stop = reqBody.timeCodeEnd;
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
          timeCode: i
        }
        const inventory = new Inventory(inventoryDerived);
        inventory.save();
    }
    return res.status(StatusCodes.OK).json({
        Result: 'Success',
    });
  }
}