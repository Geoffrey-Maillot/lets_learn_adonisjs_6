import type { HttpContext } from '@adonisjs/core/http'
import Movie from '#models/movie'
import cache from '#services/cache_service'

export default class MoviesController {
  async index({ view }: HttpContext) {
    const movies = await Movie.findAll()

    return view.render('pages/home', { movies })
  }

  async show({ view, params }: HttpContext) {
    const movie = await Movie.find(params.slug)

    return view.render('pages/movies/show', { movie })
  }

  async destroy({ response, params }: HttpContext) {
    const slug = params.slug
    await cache.delete(slug)
    return response.redirect().back()
  }
  async flush({ response }: HttpContext) {
    await cache.flush()
    return response.redirect().back()
  }
}
