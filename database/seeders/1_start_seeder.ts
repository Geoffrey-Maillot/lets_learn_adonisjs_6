import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/role'
import MovieStatus from '#models/movie_status'

import { Roles } from '#enums/roles'
import { MovieStatuses } from '#enums/movie_statuses'

export default class extends BaseSeeder {
  public static priority = 1
  async run() {
    /**
     * Seed roles
     */
    await Role.createMany([
      { id: Roles.ADMIN, title: 'Admin' },
      { id: Roles.USER, title: 'User' },
    ])

    /**
     * Seed movie statuses
     */
    await MovieStatus.createMany([
      { id: MovieStatuses.WRITING, name: 'Writing' },
      { id: MovieStatuses.CASTING, name: 'Casting' },
      { id: MovieStatuses.PRODUCTION, name: 'Production' },
      { id: MovieStatuses.POST_PRODUCTION, name: 'Post Production' },
      { id: MovieStatuses.RELEASED, name: 'Released' },
    ])
  }
}
