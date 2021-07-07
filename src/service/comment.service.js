const connection = require('../app/database')

class CommentService {
  async create(content, momentId, id) {
    const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);`
    console.log('llll')
    const [result] = await connection.execute(statement, [
      content,
      momentId,
      id,
    ])
    return result
  }
}

module.exports = new CommentService()
