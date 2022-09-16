/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Redis from '@ioc:Adonis/Addons/Redis'
import Category from 'App/Models/Category'
import Task from 'App/Models/Task'

Redis.subscribe('category:index', async () => {
  const categories = await Category.all()
  await Redis.set('categories', JSON.stringify(categories))
})

Redis.subscribe('task:index', async () => {
  const tasks = await Task.query().preload('category', (categoryQuery) => {
    categoryQuery.select('id', 'title')
  })
  await Redis.set('tasks', JSON.stringify(tasks))
})
