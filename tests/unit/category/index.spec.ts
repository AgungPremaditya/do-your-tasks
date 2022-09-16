import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Category', () => {
  test('post category of tasks', async ({ client }) => {
    const user = await User.findOrFail('6903776a-462f-4ca5-a442-d74770d75453')

    const response = await client
      .post('/category')
      .form({
        title: 'Daily Activity',
      })
      .guard('api')
      .loginAs(user)

    console.log(response.body())
  })

  test('get category list', async ({ client }) => {
    const user = await User.findOrFail('6903776a-462f-4ca5-a442-d74770d75453')

    const response = await client.get('/category').guard('api').loginAs(user)

    console.log(response.body())
  })

  test('get category list', async ({ client }) => {
    const user = await User.findOrFail('6903776a-462f-4ca5-a442-d74770d75453')
    const id = 'e4701b71-486c-45aa-9a23-c56435232a09'

    const response = await client.get(`/category/${id}`).guard('api').loginAs(user)

    console.log(response.body())
  })

  test('put category', async ({ client }) => {
    const user = await User.findOrFail('6903776a-462f-4ca5-a442-d74770d75453')
    const id = 'd1993f44-f505-4951-a069-b0082ec5ba7d'

    const response = await client
      .put(`/category/${id}`)
      .form({
        title: 'Hobby Stuff',
      })
      .guard('api')
      .loginAs(user)

    console.log(response.body())
  })

  test('delete category', async ({ client }) => {
    const user = await User.findOrFail('6903776a-462f-4ca5-a442-d74770d75453')
    const id = '09382cde-7857-4615-8d87-567d4357488c'

    const response = await client.delete(`/category/${id}`).guard('api').loginAs(user)

    console.log(response.body())
  })
})
