import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { Roles } from '#enums/roles'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      avatarUrl: faker.image.avatar(),
      roleId: Roles.USER,
    }
  })
  .state('admin', (user) => (user.roleId = Roles.ADMIN))
  .build()
