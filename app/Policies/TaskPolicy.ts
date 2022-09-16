import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import Task from 'App/Models/Task'
import User from 'App/Models/User'

export default class TaskPolicy extends BasePolicy {
  public async mainPolicy(user: User, task: Task) {
    return task.userId === user.id
  }
}
