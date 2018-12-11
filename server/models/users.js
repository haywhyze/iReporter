import db from '../../db';

module.exports = (async () => {
  try {
    await db.query(`CREATE TABLE IF NOT EXISTS
    users(
      id SERIAL PRIMARY KEY,
      firstname TEXT NOT NULL,
      lastname TEXT NOT NULL,
      othernames TEXT,
      email TEXT NOT NULL,
      phone_number TEXT NOT NULL,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      is_admin BOOLEAN NOT NULL,
      registered TIMESTAMP
    )`);
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.log(error);
  }
});
