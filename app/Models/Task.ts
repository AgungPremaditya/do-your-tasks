import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import Category from './Category'
import User from './User'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public title: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public categoryId: string

  @belongsTo(() => Category, {
    foreignKey: 'categoryId',
  })
  public category: BelongsTo<typeof Category>

  @column()
  public userId: string

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  public user: BelongsTo<typeof User>

  @beforeCreate()
  public static assignUuid(task: Task) {
    task.id = uuid()
  }
}
