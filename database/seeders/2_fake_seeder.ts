import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { UserFactory } from '#database/factories/user_factory'
import { MovieFactory } from '#database/factories/movie_factory'
import { CineastFactory } from '#database/factories/cineast_factory'

export default class extends BaseSeeder {
  static environment = ['development', 'test']

  async run() {
    /*************
     * Users
     *************/
    await UserFactory.createMany(4)
    await UserFactory.apply('admin').create()

    /*************
     * Cineasts
     *************/
    await CineastFactory.createMany(5)

    /*************
     * Movies
     *************/
    await MovieFactory.createMany(3)
    await MovieFactory.apply('casting').createMany(3)
    await MovieFactory.apply('production').createMany(3)
    await MovieFactory.apply('post_production').createMany(3)
    await MovieFactory.apply('released').createMany(3)
  }
}
