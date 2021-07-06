const errorTypes = require('../constants/error-types')
const userService = require('../service/user.service')
const { md5password } = require('../utils/password-handle')

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body

  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  const result = await userService.getUserByName(name)
  const user = result[0]
  if (!user) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  if (md5password(password) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRECT)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}

module.exports = { verifyLogin }
