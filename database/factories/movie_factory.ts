import factory from '@adonisjs/lucid/factories'
import Movie from '#models/movie'
import { MovieStatuses } from '#enums/movie_statuses'
import { DateTime } from 'luxon'

export const MovieFactory = factory
  .define(Movie, async ({ faker }) => {
    return {
      statusId: MovieStatuses.WRITING,
      writerId: faker.number.int({ min: 1, max: 5 }),
      directorId: faker.number.int({ min: 1, max: 5 }),
      title: faker.lorem.sentence(),
      slug: faker.lorem.slug(),
      summary: faker.lorem.sentence({ min: 20, max: 40 }),
      abstract: faker.lorem.paragraph({ min: 20, max: 40 }),
      posterUrl: faker.image.url(),
      releaseAt: DateTime.fromJSDate(faker.date.recent()),
    }
  })
  .state('casting', (movie) => (movie.statusId = MovieStatuses.CASTING))
  .state('production', (movie) => (movie.statusId = MovieStatuses.PRODUCTION))
  .state('post_production', (movie) => (movie.statusId = MovieStatuses.POST_PRODUCTION))
  .state('released', (movie) => (movie.statusId = MovieStatuses.RELEASED))
  .build()
