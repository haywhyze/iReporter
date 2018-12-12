import bcrypt from 'bcrypt';
import moment from 'moment';
import db from '../models/db';

module.exports = (async () => {
  try {
    await db.query('DROP TABLE redflag, intervention, users');
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.log(error);
  }
});
