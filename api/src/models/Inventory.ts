import {
    Column,
    CreatedAt,
    DeletedAt,
    Model,
    PrimaryKey, Table,
    UpdatedAt
  } from 'sequelize-typescript'
  
  @Table({ tableName: 'inventories' })
  export class Inventory extends Model<Inventory> {
    @PrimaryKey
    @Column({ autoIncrement: true })
    id: number

    @Column
    date: string

    @Column
    timeCode: number

    @Column
    capacity: number
  
    @DeletedAt
    deleted_at: string
  
    @CreatedAt
    created_at: string
  
    @UpdatedAt
    updated_at: string
  }