import router from '@adonisjs/core/services/router'

const MoviesController = () => import('#controllers/movies_controller')

/**
 * ROUTES
 */
router.get('/', [MoviesController, 'index']).as('home')

router
  .get('/movies/:slug', [MoviesController, 'show'])
  .as('movies.show')
  .where('slug', router.matchers.slug())

router.get('redis/flush', [MoviesController, 'flush']).as('redis.flush')

router.get('redis/:slug', [MoviesController, 'destroy']).as('redis.destroy')
