import jwt from 'jsonwebtoken';
import QueryHelpers from '../helpers/QueryHelpers';

const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401)
      .send({
        status: 401,
        error: 'You need a token to access this route',
      });
  }
  try {
    const decoded = await jwt.verify(token, process.env.SECRET);
    const { rows } = await QueryHelpers.getAll('users', 'id', [decoded.userId]);
    if (!rows[0]) {
      return res.status(400)
        .send({
          status: 401,
          error: 'Invalid token',
        });
    }
    req.user = { id: decoded.userId };
  } catch (error) {
    return res.status(400)
      .send({
        status: 401,
        error: 'Invalid token',
      });
  }
  return next();
};

export default verifyToken;
