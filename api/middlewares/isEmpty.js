import { joinStrings } from '../helpers';

const populateError = (req) => {
  const error = [];
  if (!req.body.comment) {
    error.push('comment');
  }
  if (!req.body.location) {
    error.push('location');
  }
  if (!req.body.type) {
    error.push('type');
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

const isEmpty = (req, res, next) => {
  let path = req.url.split('/');
  path = path[path.length - 1];

  if (req.method === 'PATCH') {
    if (!req.body[path]) {
      return res.status(400)
        .send({
          success: 'false',
          error: `No ${path} value provided`,
        });
    }
  } else {
    const error = populateError(req);

    if (error[0]) {
      const errorMsg = setErrorMsg(error);
      return res.status(400)
        .send({
          success: 'false',
          error: errorMsg,
        });
    }
  }

  return next();
};

export default isEmpty;
