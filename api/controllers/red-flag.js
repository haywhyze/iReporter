import data from '../models/red-flag';
// import validID from '../helpers';

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
    const id = Number(req.params.id);
    const redFlag = data.find(e => e.id === id);
    return res.status(200)
      .send({
        success: 'true',
        message: 'red-flag record retrieved succesfully',
        redFlag,
      });
  }

  static delete(req, res) {
    const id = Number(req.params.id);
    const redFlagIndex = data.findIndex(e => e.id === id);
    const redFlag = data.splice(redFlagIndex, 1);
    return res.status(200)
      .send({
        success: 'true',
        message: 'red-flag record has been deleted',
        redFlag,
      });
  }
}


export default RedFlagController;
