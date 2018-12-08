const isValidLocation = (req, res, next) => {
  const regexLocation = /^\(?[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?\)?)$/;

  if (!regexLocation.test(req.body.location)) {
    return res.status(400)
      .send({
        status: 400,
        error: 'Lat Long coordinates not valid',
      });
  }
  return next();
};

export default isValidLocation;

// reference https://stackoverflow.com/questions/3518504/regular-expression-for-matching-latitude-longitude-coordinates?noredirect=1&lq=1
