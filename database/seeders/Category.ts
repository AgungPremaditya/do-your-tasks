import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category'

export default class extends BaseSeeder {
  public async run() {
    Category.createMany([
      { id: 'e4701b71-486c-45aa-9a23-c56435232a09', title: 'Daily Activity' },
      { id: 'cafd9fa5-55b8-4e6f-820a-5489b2ff5d5b', title: 'Campus Activity' },
      { id: '09382cde-7857-4615-8d87-567d4357488c', title: 'Freelance Work' },
      { id: '86235d11-0533-417d-9691-082451111450', title: 'Learning New Things' },
      { id: 'd1993f44-f505-4951-a069-b0082ec5ba7d', title: 'Hobby and Fun Things' },
    ])
  }
}
