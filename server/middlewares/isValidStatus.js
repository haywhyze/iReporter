const isValidStatus = (req, res, next) => {
  const acceptedStatus = ['draft', 'under investigation', 'rejected', 'resolved'];

  if (!acceptedStatus.includes(req.body.status)) {
    return res.status(400)
      .send({
        status: 400,
        error: 'Status not of accepted value',
      });
  }
  return next();
};

export default isValidStatus;
