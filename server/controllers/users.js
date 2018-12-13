import { hashPassword, generateToken, splitName, comparePassword } from '../helpers';
import QueryHelpers from '../helpers/QueryHelpers';

class UserController {
  static async create(req, res) {
    const name = splitName(req.body.fullname);
    const hashedPassword = hashPassword(req.body.password);
    const values = [
      name.firstName.trim(),
      name.lastName.trim(),
      name.otherNames.trim(),
      req.body.email.trim(),
      hashedPassword.trim(),
      req.body.phoneNumber.trim(),
      req.body.username.trim(),
      false,
      new Date(),
    ];

    const { rows } = await QueryHelpers.createUsersQuery(values);
    if (rows) {
      const token = generateToken(rows[0].id);
      return res.status(201)
        .send({
          status: 201,
          data: [{
            token,
            user: rows[0],
          }],
        });
    }
    return res.status(500)
      .send({
        status: 500,
        error: 'Internal Server Error',
      });
  }

  static async login(req, res) {
    const { rows } = await QueryHelpers.getAll('users', 'email', [req.body.email]);
    if (!rows[0]) {
      return res.status(400)
        .send({
          status: 400,
          error: 'Username/Password is incorrect',
        });
    }
    if (!comparePassword(rows[0].password, req.body.password)) {
      return res.status(400)
        .send({
          status: 400,
          error: 'Username/Password is incorrect',
        });
    }
    const token = generateToken(rows[0].id);
    return res.status(200)
      .send({
        status: 200,
        data: [{
          token,
          user: rows[0],
        }],
      });
  }
}

export default UserController;
