const fs = require('fs')

const fileService = require('../service/file.service')
const userService = require('../service/user.service')

class UserController {
  async create(ctx, next) {
    const user = ctx.request.body
    const result = await userService.create(user)
    ctx.body = result
  }

  async getAvatar(ctx, next) {
    const { userId } = ctx.params
    const avatarInfo = await fileService.getAvatar(userId)
    ctx.response.set('content-type', avatarInfo.mimetype)
    ctx.body = fs.createReadStream(`./uploads/avatar/${avatarInfo.filename}`)
  }
}

module.exports = new UserController()
