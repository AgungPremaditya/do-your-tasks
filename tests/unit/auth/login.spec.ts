import { test } from '@japa/runner'

test.group('Auth login', () => {
  test('post a email and password to login', async ({ client }) => {
    const response = await client.post('/auth/login').form({
      email: 'schias@gmail.com',
      password: 'secret123',
    })

    console.log(response.body())
  })
})
