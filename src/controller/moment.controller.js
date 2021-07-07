const momentService = require('../service/moment.service')

class MomentController {
  async create(ctx, next) {
    const { id } = ctx.user
    const { content } = ctx.request.body
    const result = await momentService.create(content, id)
    ctx.body = result
  }

  async list(ctx, next) {
    const { offset = 0, size = 10 } = ctx.query
    const result = await momentService.list(offset, size)
    ctx.body = result
  }

  async detail(ctx, next) {
    const id = ctx.params.momentId
    const result = await momentService.getMomentById(id)
    ctx.body = result
  }

  async update(ctx, next) {
    const { content } = ctx.request.body
    const { momentId } = ctx.params
    const result = await momentService.update(content, momentId)
    ctx.body = result
  }
}

module.exports = new MomentController()
