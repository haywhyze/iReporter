import QueryHelpers from '../helpers/QueryHelpers';

class IncidentController {
  static async getAllByUser(req, res) {
    const path = req.url.split('/');
    let type = path[3];
    if (type === 'red-flags') {
      type = 'redflag';
    } else {
      type = 'intervention';
    }

    const { rows } = await QueryHelpers.getAll(`${type}`, 'created_by', [req.user.id]);

    return res.status(200)
      .send({
        status: 200,
        data: rows,
      });
  }
}


export default IncidentController;
