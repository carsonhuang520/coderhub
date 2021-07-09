const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const { APP_HOST, APP_PORT } = require('../app/config')

class FileController {
  async saveAvatar(ctx, next) {
    const { filename, mimetype, size } = ctx.req.file
    const { id } = ctx.user
    const result = await fileService.saveAvatar(filename, mimetype, size, id)

    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`
    await userService.updateAvatarUrlById(avatarUrl, id)
    ctx.body = result
  }

  async savePicture(ctx, next) {
    const files = ctx.req.files
    const { id } = ctx.user
    const { momentId } = ctx.query
    for (let file of files) {
      const { filename, mimetype, size } = file
      await fileService.savePicture(filename, mimetype, size, id, momentId)
    }
    ctx.body = '动态配图上传成功~'
  }
}

module.exports = new FileController()
