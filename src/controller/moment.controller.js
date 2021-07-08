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

  async remove(ctx, next) {
    const { momentId } = ctx.params
    const result = await momentService.remove(momentId)
    ctx.body = result
  }

  async addLabels(ctx, next) {
    const labels = ctx.labels
    const { momentId } = ctx.params

    for (let label of labels) {
      const isExist = await momentService.hasLabel(momentId, label.id)
      if (!isExist) {
        await momentService.addLabel(momentId, label.id)
      }
    }

    ctx.body = '给动态添加标签成功~~~'
  }
}

module.exports = new MomentController()
