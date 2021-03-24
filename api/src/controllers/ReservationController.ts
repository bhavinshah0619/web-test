import { StatusCodes } from 'http-status-codes';
import { Controller, Get, Post } from '@overnightjs/core'
import { Request, Response } from 'express'
import { Reservation } from '../models/Reservation'

@Controller('reservation')
export class ReservationController {
  @Post('add')
  private add(req: Request, res: Response) {
    console.log(req.body);
    // TODO: Error Checking
    const reservation = new Reservation(req.body);
    reservation.save();
    return res.status(StatusCodes.OK).json({
        Result: 'Success',
    });
  }
}