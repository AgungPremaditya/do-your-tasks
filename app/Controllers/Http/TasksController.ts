import Redis from '@ioc:Adonis/Addons/Redis'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Task from 'App/Models/Task'

export default class TasksController {
  public async index({ response, auth }: HttpContextContract) {
    const cachedTasks = await Redis.get('tasks')
    if (cachedTasks) {
      const tasks = JSON.parse(cachedTasks)
      return response.status(200).json({
        status: true,
        message: 'fetched all tasks',
        data: tasks,
      })
    } else {
      const tasks = await Task.query()
        .preload('category', (categoryQuery) => {
          categoryQuery.select('id', 'title')
        })
        .where('userId', auth.user!.id)
      await Redis.publish('task:index', '')
      return response.status(200).json({
        status: true,
        message: 'fetched all tasks',
        data: tasks,
      })
    }
  }

  public async store({ request, auth }: HttpContextContract) {
    const tasksSchema = schema.create({
      title: schema.string(),
      description: schema.string.optional(),
      categoryId: schema.string(),
    })

    const { title, description, categoryId } = await request.validate({ schema: tasksSchema })

    const result = Task.create({
      title,
      description,
      categoryId,
      userId: auth.use('api').user?.id,
    })

    await Redis.publish('task:index', '')

    return result
  }

  public async show({ bouncer, params, response }: HttpContextContract) {
    const task = await Task.query()
      .preload('category', (categoryQuery) => {
        categoryQuery.select('id', 'title')
      })
      .where('id', params.id)
      .first()

    if (!task) {
      return response.notFound()
    }

    await bouncer.with('TaskPolicy').authorize('mainPolicy', task)
    return task
  }

  public async update({ bouncer, params, request }: HttpContextContract) {
    const tasksSchema = schema.create({
      title: schema.string.optional(),
      description: schema.string.optional(),
      categoryId: schema.string.optional(),
    })

    const { title, description, categoryId } = await request.validate({ schema: tasksSchema })

    const task = await Task.findOrFail(params.id)

    await bouncer.with('TaskPolicy').authorize('mainPolicy', task)

    if (title) task.title = title
    if (description) task.description = description
    if (categoryId) task.categoryId = categoryId

    task.save()

    await Redis.publish('task:index', '')

    return task
  }

  public async destroy({ bouncer, params, response }: HttpContextContract) {
    const task = await Task.findOrFail(params.id)

    await bouncer.with('TaskPolicy').authorize('mainPolicy', task)

    task.delete()

    await Redis.publish('task:index', '')

    return response.ok({ message: 'item delete success' })
  }
}
