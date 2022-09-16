import { test } from '@japa/runner'

test.group('Auth register', () => {
  test('post a email and password to add new users', async ({ client }) => {
    const response = await client.post('/auth/register').form({
      email: 'yasha@gmail.com',
      password: 'notSoSecret123',
    })

    console.log(response.body())
  })
})
