import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public title: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(category: Category) {
    if (category.id === null) {
      category.id = uuid()
    }
  }
}
