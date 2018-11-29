import data from '../models/red-flag';

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
}


export default RedFlagController;
