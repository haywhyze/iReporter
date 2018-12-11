import moment from 'moment';
import db from '../../db';


module.exports = (async () => {
  const text = `INSERT INTO 
  intervention(
    subject, location, status, comment, created_By, created_date
  )
  VALUES($1, $2, $3, $4, $5, $6)
  returning *
  `;

  const values = [[
    'Money found in Abandoned Building',
    '(6.8484755033948, 3.37678999473)',
    'draft',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quisquam repellat recusandae quasi accusamus perferendis, maiores blanditiis assumenda!',
    1,
    moment().format('LLLL'),
  ], [
    'Need for Urgent Road Repair',
    '(6.593404442689329, 3.364960622142803)',
    'draft',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quisquam repellat recusandae quasi accusamus perferendis, maiores blanditiis assumenda!',
    1,
    moment().format('LLLL'),
  ], [
    'Corruption Case at Ministry',
    '(6.553898, 3.365978)',
    'draft',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quisquam repellat recusandae quasi accusamus perferendis, maiores blanditiis assumenda!',
    1,
    moment().format('LLLL'),
  ]];
  try {
    await db.query(text, values[0]);
    await db.query(text, values[1]);
    await db.query(text, values[2]);
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.log(error);
  }
});
