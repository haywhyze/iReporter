import data from '../models/red-flag';

const validateRecordID = (req, res, next) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)
    || id % 1 !== 0
    || id < 1
    || String(req.params.id).indexOf('.') !== -1) {
    return res.status(400)
      .send({
        success: false,
        error: 'red-flag ID value provided is not valid',
      });
  }
  const found = data.find(e => e.id === id);
  if (!found) {
    return res.status(404)
      .send({
        success: false,
        error: 'red-flag record ID provided does not exist',
      });
  }

  return next();
};


export default validateRecordID;
