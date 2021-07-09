const path = require('path')

const Multer = require('koa-multer')
const Jimp = require('jimp')

const avatarUpload = Multer({
  dest: './uploads/avatar',
})

const pictureUpload = Multer({
  dest: './uploads/picture',
})

const avatarHandler = avatarUpload.single('avatar')

const pictureHandler = pictureUpload.array('picture', 9)

const pictureResize = async (ctx, next) => {
  try {
    const files = ctx.req.files
    for (let file of files) {
      const filePath = path.join(file.destination, file.filename)
      Jimp.read(file.path).then((image) => {
        image.resize(1280, Jimp.AUTO).write(`${filePath}-large`)
        image.resize(640, Jimp.AUTO).write(`${filePath}-middle`)
        image.resize(320, Jimp.AUTO).write(`${filePath}-small`)
      })
    }
    await next()
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  avatarHandler,
  pictureHandler,
  pictureResize,
}
