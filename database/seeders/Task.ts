import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Task from 'App/Models/Task'

export default class extends BaseSeeder {
  public async run() {
    Task.createMany([
      {
        id: '199127c1-62c5-479d-a792-54745be4482f',
        title: 'Workout',
        description: 'working out about 5-10 minutes',
        categoryId: 'e4701b71-486c-45aa-9a23-c56435232a09',
        userId: '6903776a-462f-4ca5-a442-d74770d75453',
      },
      {
        id: 'a4b29484-2e47-40bf-9e42-7cfd19ef7491',
        title: 'Digital Marketing Classes',
        description: 'classes start at 8 AM in Room 3B',
        categoryId: 'cafd9fa5-55b8-4e6f-820a-5489b2ff5d5b',
        userId: '6903776a-462f-4ca5-a442-d74770d75453',
      },
      {
        id: '3c3a5e65-5249-40dc-8809-e7f72528af6d',
        title: 'Learn more about Golang',
        description: 'continue online courses about golang',
        categoryId: '86235d11-0533-417d-9691-082451111450',
        userId: '6903776a-462f-4ca5-a442-d74770d75453',
      },
    ])
  }
}
