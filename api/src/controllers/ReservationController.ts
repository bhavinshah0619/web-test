import { StatusCodes } from 'http-status-codes';
import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Reservation } from '../models/Reservation';
import { Inventory } from '../models/Inventory';

@Controller('reservation')
export class ReservationController {
  @Post('add')
  private add(req: Request, res: Response) {
    console.log(req.body);
    // TODO: Error Checking
    const reservation = new Reservation(req.body);
    reservation.save();
    // Decrement the avail count from Inventory
    Inventory.findOne({ where: { 
        date: req.body.date,
        timecode: req.body.timecode
        }
    }).then((item) => {
        --item.available;
        item.save();
    });
    return res.status(StatusCodes.OK).json({
        Result: 'Success',
    });
  }
}