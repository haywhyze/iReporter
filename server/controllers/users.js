import moment from 'moment';
import db from '../../db';
import { hashPassword, generateToken, comparePassword } from '../helpers';

class UserController {
  static async create(req, res) {
    const hashedPassword = hashPassword(req.body.password);
    const query = `firstname, lastname, othernames, email, password, phone_number, username,
    is_admin, registered
  )
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      returning *`;
    const values = [
      req.body.firstname,
      req.body.lastname,
      req.body.othernames,
      req.body.email,
      hashedPassword,
      req.body.phoneNumber,
      req.body.username,
      false,
      moment().format('LLLL'),
    ];

    try {
      const { rows } = await db.query(query, values);
      const token = generateToken(rows[0].id);
      return res.status(201)
        .send({
          token,
        });
    } catch (err) {
      if (err.routine === '_bt_check_unique') {
        return res.status(400)
          .send({
            message: 'User with that Email/Username already exist',
          });
      }
      return res.status(400)
        .send(err, 'lol');
    }
  }

  static async login(req, res) {
    const query = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(query, [req.body.email]);
      if (!rows[0]) {
        return res.status(400)
          .send({
            message: 'The credentials you provided is incorrect'
          });
      }
      if (!comparePassword(rows[0].password, req.body.password)) {
        return res.status(400)
          .send({
            message: 'The credentials you provided is incorrect',
          });
      }
      const token = generateToken(rows[0].id);
      return res.status(200)
        .send({ token });
    } catch (err) {
      return res.status(400)
        .send(err);
    }
  }
}

export default UserController;
