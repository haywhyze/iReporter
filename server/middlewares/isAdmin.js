import db from '../models/db';
import { resolveType } from '../helpers';

const isAdmin = async (req, res, next) => {
  const type = resolveType(req);
  let { rows } = await db.query('SELECT is_admin FROM users WHERE id = $1', [req.user.id]);
  if (rows[0].is_admin === true) {
    if (!req.params.id) {
      const result = await db.query(`SELECT * FROM ${type}`);
      if (result.rows[0]) {
        res.status(200)
          .send({
            status: 200,
            data: result.rows,
          });
      } else {
        res.status(200)
          .send({
            status: 200,
            message: `No ${type} records available`,
          });
      }
    } else if (req.params.id) {
      rows = await db.query(`SELECT * FROM ${type} WHERE id = $1 returning *`, [req.params.id]);
      if (rows[0]) {
        res.status(200)
          .send({
            status: 200,
            data: rows,
          });
      } else {
        res.status(200)
          .send({
            status: 200,
            message: `No ${type} records available`,
          });
      }
    }
  } return next();
};
export default isAdmin;
