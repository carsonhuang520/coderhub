const Router = require('koa-router')

const {
  create,
  list,
  detail,
  update,
  remove,
  addLabels,
  fileInfo,
} = require('../controller/moment.controller')
const {
  verifyAuth,
  verifyPermission,
} = require('../middleware/auth.middleware')
const { verifyExists } = require('../middleware/label.middleware')

const momentRouter = new Router({ prefix: '/moment' })

momentRouter.post('/', verifyAuth, create)
momentRouter.get('/', list)
momentRouter.get('/:momentId', detail)

momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove)

momentRouter.post(
  '/:momentId/labels',
  verifyAuth,
  verifyPermission,
  verifyExists,
  addLabels
)

momentRouter.get('/images/:filename', fileInfo)

module.exports = momentRouter
