import db from '../../db';

const validateRecordID = async (req, res, next) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)
    || id % 1 !== 0
    || id < 1
    || String(req.params.id).indexOf('.') !== -1) {
    return res.status(400)
      .send({
        status: 400,
        error: 'red-flag ID value provided is not valid',
      });
  }
  const findOne = 'SELECT * from redflag WHERE id = $1';
  try {
    const { rowCount } = await db.query(findOne, [id]);
    if (!rowCount) {
      return res.status(404)
        .send({
          status: 404,
          error: 'red-flag ID does not exist',
        });
    }
    return next();
  } catch (error) {
    return next();
  }
};


export default validateRecordID;
