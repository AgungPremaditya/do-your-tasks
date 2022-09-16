import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.create({
      id: '6903776a-462f-4ca5-a442-d74770d75453',
      email: 'schias@gmail.com',
      password: 'secret123',
    })
  }
}
