import QueryHelpers from '../helpers/QueryHelpers';
import { resolveType } from '../helpers';

class IncidentController {
  static async getAllByUser(req, res) {
    const type = resolveType(req);
    const { rows } = await QueryHelpers.getAll(`${type}`, 'created_by', [req.user.id]);

    return res.status(200)
      .send({
        status: 200,
        data: [rows],
      });
  }

  static async getOneByUser(req, res) {
    const id = Number(req.params.id);
    const type = resolveType(req);
    const { rows } = await QueryHelpers.getOneByUser(`${type}`, [id, req.user.id]);

    return res.status(200)
      .send({
        status: 200,
        data: [rows],
      });
  }
}


export default IncidentController;
