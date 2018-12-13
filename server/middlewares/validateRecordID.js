import QueryHelpers from '../helpers/QueryHelpers';
import { resolveType } from '../helpers';

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
  const type = resolveType(req);
  const { rows } = await QueryHelpers.getAll(`${type}`, 'id', [id]);
  if (!rows[0]) {
    return res.status(404)
      .send({
        status: 404,
        error: 'red-flag ID does not exist',
      });
  }
  return next();
};


export default validateRecordID;
