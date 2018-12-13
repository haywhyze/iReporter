import 'babel-polyfill';
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

  static async getOneByUser(table, userInfo) {
    try {
      const result = await db.query(`SELECT * FROM ${table} WHERE id = $1 AND created_by = $2`, userInfo);
      return result;
    } catch (error) {
      return undefined;
    }
  }

  static async deleteOneByUser(table, userInfo) {
    try {
      const result = await db.query(`DELETE FROM ${table} WHERE id = $1 AND created_by = $2 returning id`, userInfo);
      return result;
    } catch (error) {
      return undefined;
    }
  }

  static async createIncident(table, userInfo) {
    const text = `INSERT INTO 
      ${table}(
        subject, location, status, comment, created_By, created_date
      )
      VALUES($1, $2, $3, $4, $5, $6)
      returning *
      `;
    try {
      const result = db.query(text, userInfo);
      return result;
    } catch (error) {
      return error;
    }
  }
}

export default QueryHelpers;
