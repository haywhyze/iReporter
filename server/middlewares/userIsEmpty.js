import { joinStrings } from '../helpers';

const populateError = (req) => {
  const error = [];
  if (!req.body.firstname) {
    error.push('firstname');
  }
  if (!req.body.lastname) {
    error.push('lastname');
  }
  if (!req.body.email) {
    error.push('email');
  }
  if (!req.body.phoneNumber) {
    error.push('phoneNumber');
  }
  if (!req.body.username) {
    error.push('username');
  }
  if (!req.body.password) {
    error.push('password');
  }
  return error;
};

const setErrorMsg = (error) => {
  let errorMsg;
  if (error.length === 1) {
    errorMsg = `No values provided for ${error[0]}`;
  } else {
    errorMsg = `No values provided for ${joinStrings(error)}`;
  }
  return errorMsg;
};

const userIsEmpty = (req, res, next) => {

  const error = populateError(req);

  if (error[0]) {
    const errorMsg = setErrorMsg(error);
    return res.status(400)
      .send({
        status: 400,
        error: errorMsg,
      });
  }

  return next();
};

export default userIsEmpty;
