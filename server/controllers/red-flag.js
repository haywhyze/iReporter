import moment from 'moment';
import db from '../../db';
// import validID from '../helpers';
import { update } from '../helpers';

class RedFlagController {
  static async getAll(req, res) {
    const findAll = 'SELECT * FROM redflag';
    try {
      const { rows } = await db.query(findAll);
      return res.status(200)
        .send({
          status: 200,
          data: rows,
        });
    } catch (error) {
      return res.status(500)
        .send({
          status: 500,
          error: 'Internal Server Error',
        });
    }
  }

  static async getOne(req, res) {
    const id = Number(req.params.id);
    const findOne = 'SELECT * from redflag WHERE id = $1';
    try {
      const { rows } = await db.query(findOne, [id]);
      return res.status(200)
        .send({
          status: 200,
          data: [rows],
        });
    } catch (error) {
      return res.status(500)
        .send({
          status: 500,
          error: 'Internal Server Error',
        });
    }
  }

  static async create(req, res) {
    const text = `INSERT INTO 
  redflag(
    subject, location, status, comment, created_By, created_date
  )
  VALUES($1, $2, $3, $4, $5, $6)
  returning *
  `;

    const values = [
      req.body.subject || '',
      req.body.location,
      'draft',
      req.body.comment,
      1,
      moment().format('LLLL'),
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201)
        .send({
          status: 201,
          data: [{
            id: rows[0].id,
            message: 'Created red-flag record',
          }],
        });
    } catch (error) {
      return res.status(500)
        .send({
          status: 500,
          error: 'Internal Server Error',
        });
    }
  }

  static updateLocation(req, res) {
    return update(req, res, 'location');
  }

  static updateComment(req, res) {
    return update(req, res, 'comment');
  }

  static async delete(req, res) {
    const id = Number(req.params.id);
    const removeOne = 'DELETE from redflag WHERE id = $1 returning *';
    try {
      const { rows } = await db.query(removeOne, [id]);
      return res.status(200)
        .send({
          status: 200,
          data: [{
            id: rows[0].id,
            message: 'red-flag record has been deleted',
          }],
        });
    } catch (error) {
      return res.status(500)
        .send({
          status: 500,
          error: 'Internal Server Error',
        });
    }
  }
}


export default RedFlagController;
