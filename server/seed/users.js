import bcrypt from 'bcrypt';
import moment from 'moment';
import db from '../models/db';

const saltRounds = 10;
const plainPassword = '(adminPASSWORD2018)';

module.exports = (async () => {
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  const text = `INSERT INTO 
  users(
    firstname, lastname, othernames, email, password, phone_number, username,
    is_admin, registered
  )
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
  returning *
  `;

  const values = [
    'Yusuf',
    'Abdulkarim',
    'Ayo',
    'haywhyze@yahoo.com',
    `${hashedPassword}`,
    '08031961496',
    'haywhyze',
    true,
    moment().format('LLLL'),
  ];
  try {
    await db.query(text, values);
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.log(error);
  }
});
