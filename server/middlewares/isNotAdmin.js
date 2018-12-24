import db from '../models/db';

const isAdmin = async (req, res, next) => {
  const { rows } = await db.query(`SELECT is_admin FROM users WHERE id = $1`, [req.user.id]);
  if (rows[0].is_admin === false) {
    return next();
  }
  return res.status(403)
    .send({
      status: 403,
      error: 'You are not allowed to access this route',
    });
};

export default isAdmin;
