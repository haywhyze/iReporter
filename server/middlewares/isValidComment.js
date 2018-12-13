const isValidComment = (req, res, next) => {
  if (req.body.comment.trim().length < 50 || req.body.comment.trim().length > 420) {
    return res.status(400)
      .send({
        status: 400,
        error: 'Comment too short or too long',
      });
  }
  return next();
};

export default isValidComment;
