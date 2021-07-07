const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const userRouter = require('../router/user.router')
const authRouter = require('../router/auth.router')
const momentRouter = require('../router/moment.router')
const errorHandler = require('./error-handle')

const app = new Koa()

app.use(bodyParser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())
app.use(authRouter.routes())
app.use(authRouter.allowedMethods())
app.use(momentRouter.routes())
app.use(momentRouter.allowedMethods())

app.on('error', errorHandler)

module.exports = app
