const labelService = require('../service/label.service')

const verifyExists = async (ctx, next) => {
  const { labels } = ctx.request.body
  const newLabels = []
  for (let name of labels) {
    let label = { name }
    const labelResult = await labelService.getLabelByName(name)
    if (!labelResult) {
      const result = await labelService.create(name)
      label.id = result.insertId
    } else {
      label.id = labelResult.id
    }
    newLabels.push(label)
  }
  ctx.labels = newLabels
  await next()
}

module.exports = {
  verifyExists,
}
