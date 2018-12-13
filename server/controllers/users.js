import { hashPassword, generateToken, splitName } from '../helpers';
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
}

export default UserController;
