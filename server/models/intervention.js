import db from '../../db';

module.exports = (async () => {
  try {
    await db.query(`CREATE TABLE IF NOT EXISTS
    intervention(
      id SERIAL PRIMARY KEY,
      subject TEXT,
      location TEXT NOT NULL,
      status TEXT NOT NULL,
      comment TEXT NOT NULL,
      created_by INTEGER,
      created_date TIMESTAMP
    )`);
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.log(error);
  }
});
