const connection = require('../app/database')

class AuthService {
  async checkMoment(momentId, userId) {
    try {
      const statement = `SELECT * FROM moment WHERE id = ? AND user_id = ?;`
      const [result] = await connection.execute(statement, [momentId, userId])
      return result.length !== 0
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new AuthService()
