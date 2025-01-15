import cache from '#services/cache_service'
import MovieService from '#services/movie_service'

export default class Movie {
  declare title: string
  declare slug: string
  declare summary?: string
  declare content?: string

  static async findAll() {
    const files = await MovieService.readFiles('resources/movies')
    let movies: Array<Movie> = []

    for (const fileName of files) {
      const movie = await this.find(fileName)

      if (movie) movies.push(movie)
    }
    return movies
  }

  static async find(slug: string) {
    const hasCache = await cache.has(slug)
    if (hasCache) {
      console.log('cache hit')
      return await cache.get<Movie>(slug)
    }

    const md = await MovieService.read(slug + '.md')
    const movie = new Movie()
    movie.title = md.frontmatter.title
    movie.slug = md.frontmatter.slug
    movie.summary = md.frontmatter.summary
    movie.content = md.contents.trim()

    await cache.set(slug, movie)
    return movie
  }
}
