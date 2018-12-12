import db from '../../db';
import { hashPassword, generateToken, splitName } from '../helpers';

class UserController {
  static async create(req, res) {
    const name = splitName(req.body.fullname);
    const hashedPassword = hashPassword(req.body.password);
    const query = `INSERT INTO
    users(firstname, lastname, othernames, email, password, phone_number, username,
    is_admin, registered
  )
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      returning *`;
    const values = [
      name.firstName,
      name.lastName,
      name.otherNames,
      req.body.email,
      hashedPassword,
      req.body.phoneNumber,
      req.body.username,
      false,
      new Date(),
    ];

    try {
      const { rows } = await db.query(query, values);
      const token = generateToken(rows[0].id);
      return res.status(201)
        .send({
          status: 201,
          data: [{
            token,
            user: rows[0],
          }],
        });
    } catch (err) {
      if (err.routine === '_bt_check_unique') {
        return res.status(400)
          .send({
            status: 400,
            error: 'User with that Email/Username already exist',
          });
      }
      return res.status(500)
        .send({
          status: 500,
          err,
        });
    }
  }
}

export default UserController;
