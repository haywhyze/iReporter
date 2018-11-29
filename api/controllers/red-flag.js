import data from '../models/red-flag';
import validID from '../helpers';

class RedFlagController {
  static getAll(req, res) {
    if (data[0] !== undefined) {
      return res.status(200)
        .send({
          success: true,
          message: 'Red Flags retrieved successfully',
          redFlags: data,
        });
    }

    return res.status(200)
      .send({
        success: true,
        message: 'No red-flags records available.',
      });
  }

  static getOne(req, res) {
    if (!validID(req.params.id)) {
      return res.status(400)
        .send({
          success: false,
          error: 'Record ID value is invalid',
        });
    }
    const id = Number(req.params.id);
    const redFlag = data.find(e => e.id === id);
    if (redFlag !== undefined) {
      return res.status(200)
        .send({
          success: 'true',
          message: 'red-flag record retrieved succesfully',
          redFlag,
        });
    }
    return res.status(404)
      .send({
        success: false,
        error: 'Record ID does not exist',
      });
  }
}


export default RedFlagController;
