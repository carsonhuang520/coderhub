const connection = require('../app/database')

class MomentService {
  async create(content, id) {
    const statement = `INSERT INTO moment(content, user_id) VALUES(?, ?);`
    const [result] = await connection.execute(statement, [content, id])
    return result
  }
  async list(offset, size) {
    const statement = `
      SELECT 
        m.id, m.content, m.createAt createTime, m.updateAt updateTime, 
        JSON_OBJECT('id', u.id, 'name', u.name) user,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount
      FROM moment m 
      LEFT JOIN user u ON m.user_id = u.id 
      LIMIT ?, ?;
    `
    const [result] = await connection.execute(statement, [offset, size])
    return result
  }

  async getMomentById(id) {
    const statement = `
      SELECT 
        m.id, m.content, m.createAt createTime, m.updateAt updateTime, 
        JSON_OBJECT('id', u.id, 'name', u.name) user 
      FROM moment m 
      LEFT JOIN user u ON m.user_id = u.id 
      WHERE m.id = ?;
    `
    const [result] = await connection.execute(statement, [id])
    return result[0]
  }

  async update(content, momentId) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [content, momentId])
    return result
  }

  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`
    const [result] = await connection.execute(statement, [momentId])
    return result
  }
}

module.exports = new MomentService()
