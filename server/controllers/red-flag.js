import moment from 'moment';
import data from '../models/defunct';
import { update } from '../helpers';

class RedFlagController {
  static getAll(req, res) {
    if (data[0] !== undefined) {
      return res.status(200)
        .send({
          status: 200,
          data,
        });
    }

    return res.status(200)
      .send({
        status: 200,
        data,
      });
  }

  static getOne(req, res) {
    const id = Number(req.params.id);
    const redFlag = data.find(e => e.id === id);
    return res.status(200)
      .send({
        status: 200,
        data: [redFlag],
      });
  }

  static create(req, res) {
    const redFlag = {
      id: data.length + 1,
      subject: req.body.subject || '',
      type: req.body.type,
      location: req.body.location,
      status: 'draft',
      comment: req.body.comment,
      createdBy: 1,
      createdOn: moment().format('LLLL'),
    };

    data.push(redFlag);
    return res.status(201)
      .send({
        status: 201,
        data: [{
          id: redFlag.id,
          message: 'Created red-flag record',
        }],
      });
  }

  static updateLocation(req, res) {
    return update(req, res, 'location');
  }

  static updateComment(req, res) {
    return update(req, res, 'comment');
  }

  static delete(req, res) {
    const id = Number(req.params.id);
    const redFlagIndex = data.findIndex(e => e.id === id);
    const redFlag = data.splice(redFlagIndex, 1);
    return res.status(200)
      .send({
        status: 200,
        data: [{
          id: redFlag.id,
          message: 'red-flag record has been deleted',
        }],
      });
  }
}

export default RedFlagController;
