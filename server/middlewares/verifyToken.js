import jwt from 'jsonwebtoken';
import db from '../../db';

const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(400)
      .send({
        message: 'Token is not provided',
      });
  }
  try {
    const decoded = await jwt.verify(token, process.env.SECRET);
    const query = 'SELECT * FROM users WHERE id = $1';
    const { rows } = await db.query(query, [decoded.userId]);
    if (!rows[0]) {
      return res.status(400)
        .send({
          message: 'The token you provided is invalid',
        });
    }
    req.user = { id: decoded.userId };
    return next();
  } catch (err) {
    return res.status(400)
      .send(err);
  }
};

export default verifyToken;
