import bcrypt from 'bcrypt';
import moment from 'moment';
import db from '../models/db';

const saltRounds = 10;
const adminPassword = '(adminPASSWORD2018)';
const userPassword = '(userPASSWORD2018)';

module.exports = (async () => {
  const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);
  const hashUserPassword = await bcrypt.hash(userPassword, saltRounds);
  const text = `INSERT INTO 
  users(
    firstname, lastname, othernames, email, password, phone_number, username,
    is_admin, registered
  )
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
  returning *
  `;

  const values = [[
    'Yusuf',
    'Abdulkarim',
    'Ayo',
    'haywhyze@yahoo.com',
    `${hashedPassword}`,
    '08031961496',
    'haywhyze',
    true,
    moment().format('LLLL'),
  ], [
    'Ayobami',
    'Olaitan',
    'Omotunde',
    'haywhyze@myspace.com',
    `${hashUserPassword}`,
    '08055744044',
    'hayzbaba',
    false,
    new Date(),
  ]];
  try {
    await db.query(text, values[0]);
    await db.query(text, values[1]);
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.log(error);
  }
});
