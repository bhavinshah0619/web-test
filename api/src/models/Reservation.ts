import {
    Column,
    CreatedAt,
    DeletedAt,
    Model,
    PrimaryKey, Table,
    UpdatedAt,
  } from 'sequelize-typescript'
  
  @Table({ tableName: 'reservations' })
  export class Reservation extends Model<Reservation> {
    @PrimaryKey
    @Column({ autoIncrement: true })
    id: number
  
    @Column
    name: string
  
    @Column
    email: string

    @Column
    size: string

    @Column
    date: string

    @Column
    timecode: number
  
    @DeletedAt
    deleted_at: string
  
    @CreatedAt
    created_at: string
  
    @UpdatedAt
    updated_at: string
  }