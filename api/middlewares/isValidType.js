const isValidType = (req, res, next) => {
  const acceptedType = ['red-flag', 'intervention'];

  if (!acceptedType.includes(req.body.type)) {
    return res.status(400)
      .send({
        success: 'false',
        error: 'Type not of accepted value',
      });
  }
  return next();
};

export default isValidType;
