import {
    Column,
    CreatedAt,
    DeletedAt,
    Model,
    Index,
    PrimaryKey, Table,
    UpdatedAt
  } from 'sequelize-typescript'
  
  @Table({ tableName: 'inventories' })
  export class Inventory extends Model<Inventory> {
    @PrimaryKey
    @Column({ autoIncrement: true })
    id: number

    @Index
    @Column
    date: string

    @Column
    timecode: number

    @Column
    capacity: number
  
  
    @CreatedAt
    created_at: string
  
    @UpdatedAt
    updated_at: string
  }