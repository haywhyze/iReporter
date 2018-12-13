import QueryHelpers from '../helpers/QueryHelpers';

const userInfoExists = async (req, res, next) => {
  const { rows } = await QueryHelpers.checkUserInfoExist([req.body.email, req.body.username]);
  if (rows[0]) {
    return res.status(409)
      .send({
        status: 409,
        error: 'Username/Email Already Exists',
      });
  }
  return next();
};

export default userInfoExists;
