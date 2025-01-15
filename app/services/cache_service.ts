import redis from '@adonisjs/redis/services/main'

class CacheService {
  async has(...keys: string[]) {
    const exists = await redis.exists(keys)
    console.log('has', keys, exists)
    return exists
  }

  async set(key: string, value: any) {
    await redis.set(key, JSON.stringify(value))
  }

  async get<T>(key: string): Promise<T | undefined> {
    const value = await redis.get(key)
    return value ? (JSON.parse(value) as T) : undefined
  }

  async delete(key: string) {
    await redis.del(key)
  }

  async deleteMany(keys: string[]) {
    await redis.del(keys)
  }

  async flush() {
    await redis.flushdb()
  }
}

const cache = new CacheService()

export default cache
