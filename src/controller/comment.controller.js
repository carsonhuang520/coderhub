const commentService = require('../service/comment.service')

class CommentController {
  async create(ctx, next) {
    const { content, momentId } = ctx.request.body
    const { id } = ctx.user
    const result = await commentService.create(content, momentId, id)
    ctx.body = result
  }

  async reply(ctx, next) {
    try {
      const { content, momentId } = ctx.request.body
      const { id } = ctx.user
      const { commentId } = ctx.params
      const result = await commentService.reply(
        commentId,
        content,
        momentId,
        id
      )
      ctx.body = result
    } catch (error) {
      console.log(error)
    }
  }

  async update(ctx, next) {
    const { content } = ctx.request.body
    const { commentId } = ctx.params
    const result = await commentService.update(commentId, content)
    ctx.body = result
  }

  async remove(ctx, next) {
    const { commentId } = ctx.params
    const result = await commentService.remove(commentId)
    ctx.body = result
  }
}

module.exports = new CommentController()
