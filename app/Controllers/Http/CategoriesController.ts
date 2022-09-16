import Redis from '@ioc:Adonis/Addons/Redis'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Category from 'App/Models/Category'

export default class CategoriesController {
  public async index({ response }: HttpContextContract) {
    const cachedCategories = await Redis.get('categories')
    if (cachedCategories) {
      const categories = JSON.parse(cachedCategories)
      return response.status(200).json({
        status: true,
        message: 'fetched all categories',
        data: categories,
      })
    } else {
      const categories = Category.all()
      await Redis.publish('category:index', '')
      return response.status(200).json({
        status: true,
        message: 'fetched all categories',
        data: categories,
      })
    }
  }

  public async store({ request }: HttpContextContract) {
    const categoriesSchema = schema.create({
      title: schema.string(),
    })

    const { title } = await request.validate({ schema: categoriesSchema })

    const result = Category.create({ title })

    await Redis.publish('category:index', '')

    return result
  }

  public async show({ params }: HttpContextContract) {
    const inventory = await Category.findOrFail(params.id)

    return inventory
  }

  public async update({ params, request }: HttpContextContract) {
    const categoriesSchema = schema.create({
      title: schema.string(),
    })

    const { title } = await request.validate({ schema: categoriesSchema })

    const category = await Category.findOrFail(params.id)

    category.title = title

    category.save()

    await Redis.publish('category:index', '')

    return category
  }

  public async destroy({ params, response }: HttpContextContract) {
    const category = await Category.findOrFail(params.id)

    category.delete()

    await Redis.publish('category:index', '')

    return response.ok({ message: 'item delete success' })
  }
}
