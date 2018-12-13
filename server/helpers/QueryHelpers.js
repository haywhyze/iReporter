import db from '../models/db';

class QueryHelpers {
  static async createUsersQuery(userInfo) {
    try {
      const result = await db.query(`INSERT INTO 
    users(firstname, lastname, othernames, email, 
          password, phone_number, username,
          is_admin, registered)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
    returning *`, userInfo);

      return result;
    } catch (error) {
      return undefined;
    }
  }

  static async checkUserInfoExist(userInfo) {
    try {
      const result = await db.query('SELECT email, username FROM users WHERE email = $1 OR username = $2', userInfo);
      return result;
    } catch (err) {
      console.log(err);
    }
    const text = 'SELECT email, username FROM users WHERE email = $1 OR username = $2';
    const result = await db.query(text, userInfo);
    return result;
  }

  static async getAll(table, column, userInfo) {
    try {
      const result = await db.query(`SELECT * FROM ${table} WHERE ${column} = $1`, userInfo);
      return result;
    } catch (error) {
      return undefined;
    }
  }
}

export default QueryHelpers;
