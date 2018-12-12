import QueryHelpers from '../helpers/QueryHelpers';

const userInfoExists = async (req, res, next) => {
  const { rows } = await QueryHelpers.checkUserInfoExist([req.body.email, req.body.username]);
  if (rows[0]) {
    return res.status(400)
      .send({
        status: 400,
        error: 'Username/Email Already Exists',
      });
  }
  return next();
};

export default userInfoExists;
