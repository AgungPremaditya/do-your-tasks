import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public async register({ request, auth }: HttpContextContract) {
    const userSchema = schema.create({
      email: schema.string([rules.email()]),
      password: schema.string([rules.minLength(8)]),
    })

    const { email, password } = await request.validate({ schema: userSchema })

    const user = await User.create({ email, password })

    const token = await auth.use('api').login(user)

    return token.toJSON()
  }

  public async login({ request, auth }: HttpContextContract) {
    const userSchema = schema.create({
      email: schema.string([rules.email()]),
      password: schema.string([rules.minLength(8)]),
    })

    const { email, password } = await request.validate({ schema: userSchema })

    const result = await auth.use('api').attempt(email, password)

    return result
  }
}
