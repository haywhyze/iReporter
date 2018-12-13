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

  static async create(req, res) {
    const type = resolveType(req);
    const values = [
      req.body.subject || '',
      req.body.location.trim(),
      'draft',
      req.body.comment.trim(),
      req.user.id,
      new Date(),
    ];

    const { rows } = await QueryHelpers.createIncident(type, values);
    if (rows[0]) {
      return res.status(201)
        .send({
          status: 201,
          data: [{
            id: rows[0].id,
            message: 'Created red-flag record',
          }],
        });
    }
    return res.status(500)
      .send({
        status: 500,
        error: 'Internal Server Error',
      });
  }

  static async delete(req, res) {
    const type = resolveType(req);
    const id = Number(req.params.id);
    const { rows } = await QueryHelpers.deleteOneByUser(`${type}`, [id, req.user.id]);
    if (rows[0]) {
      return res.status(200)
        .send({
          status: 200,
          data: [{
            id: rows[0].id,
            message: 'red-flag record has been deleted',
          }],
        });
    }
    return res.status(500)
      .send({
        status: 500,
        error: 'Internal Server Error',
      });
  }
}

export default IncidentController;
