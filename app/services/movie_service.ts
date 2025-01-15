import { Exception } from '@adonisjs/core/exceptions'
import app from '@adonisjs/core/services/app'
import { MarkdownFile } from '@dimerapp/markdown'
import fs from 'node:fs/promises'

class MovieService {
  static async readFiles(path: string): Promise<string[]> {
    const dirPath = app.makeURL(path)
    const files = await fs.readdir(dirPath)
    return files.map((file) => file.replace('.md', ''))
  }

  static async readFile(fileName: string): Promise<string> {
    const filePath = app.makeURL(`resources/movies/${fileName}`)
    return await fs.readFile(filePath, 'utf8')
  }

  static async read(fileName: string): Promise<MarkdownFile> {
    try {
      const file = await this.readFile(fileName)
      const md = new MarkdownFile(file)
      await md.process()
      return md
    } catch (error) {
      throw new Exception('Movie not found : ' + fileName, {
        code: 'E_NOT_FOUND',
        status: 404,
      })
    }
  }
}

export default MovieService
