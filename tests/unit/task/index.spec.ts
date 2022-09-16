import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Task', () => {
  test('post new task', async ({ client }) => {
    const user = await User.findOrFail('6903776a-462f-4ca5-a442-d74770d75453')

    const response = await client
      .post('/task')
      .form({
        title: 'Join a Class',
        description: 'Web developer class',
        categoryId: 'cafd9fa5-55b8-4e6f-820a-5489b2ff5d5b',
      })
      .guard('api')
      .loginAs(user)

    console.log(response.body())
  })

  test('get task list', async ({ client }) => {
    const user = await User.findOrFail('6903776a-462f-4ca5-a442-d74770d75453')

    const response = await client.get('/task').guard('api').loginAs(user)

    console.log(response.body())
  })

  test('get task details', async ({ client }) => {
    const user = await User.findOrFail('6903776a-462f-4ca5-a442-d74770d75453')
    const id = '3c3a5e65-5249-40dc-8809-e7f72528af6d'

    const response = await client.get(`/task/${id}`).guard('api').loginAs(user)

    console.log(response.body())
  })

  test('put task', async ({ client }) => {
    const user = await User.findOrFail('6903776a-462f-4ca5-a442-d74770d75453')
    const id = '199127c1-62c5-479d-a792-54745be4482f'

    const response = await client
      .put(`/task/${id}`)
      .form({
        title: 'Make Breakfast and Eat',
        description: 'make any breakfast for eating',
        categoryId: 'e4701b71-486c-45aa-9a23-c56435232a09',
      })
      .guard('api')
      .loginAs(user)

    console.log(response.body())
  })

  test('delete task', async ({ client }) => {
    const user = await User.findOrFail('6903776a-462f-4ca5-a442-d74770d75453')
    const id = 'a4b29484-2e47-40bf-9e42-7cfd19ef7491'

    const response = await client.delete(`/category/${id}`).guard('api').loginAs(user)

    console.log(response.body())
  })
})
