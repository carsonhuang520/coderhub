const Router = require('koa-router')

const { verifyAuth } = require('../middleware/auth.middleware')
const {
  avatarHandler,
  pictureHandler,
  pictureResize,
} = require('../middleware/file.middleware')
const { saveAvatar, savePicture } = require('../controller/file.controller')

const fileRouter = new Router({ prefix: '/upload' })

fileRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatar)
fileRouter.post(
  '/picture',
  verifyAuth,
  pictureHandler,
  pictureResize,
  savePicture
)

module.exports = fileRouter
