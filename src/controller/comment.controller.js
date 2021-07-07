const commentService = require('../service/comment.service')

class CommentController {
  async create(ctx, next) {
    const { content, momentId } = ctx.request.body
    const { id } = ctx.user
    const result = await commentService.create(content, momentId, id)
    ctx.body = result
  }
}

module.exports = new CommentController()
