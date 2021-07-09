const fileService = require('../service/file.service')

class FileController {
  async saveAvatar(ctx, next) {
    const { filename, mimetype, size } = ctx.req.file
    console.log(ctx.req.file)
    const { id } = ctx.user
    const result = await fileService.saveAvatar(filename, mimetype, size, id)
    ctx.body = result
  }
}

module.exports = new FileController()
