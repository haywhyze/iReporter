const isValidComment = (req, res, next) => {
  if (req.body.comment.length < 50 || req.body.comment.length > 420) {
    return res.status(400)
      .send({
        status: 400,
        error: 'Comment too short or too long',
      });
  }
  return next();
};

export default isValidComment;
