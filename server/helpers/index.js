import db from '../../db';

const joinStrings = (strings) => {
  const stringArray = strings.map(x => `${x},`);
  stringArray[stringArray.length - 1] = `and ${stringArray[stringArray.length - 1].slice(0, -1)}`;
  stringArray[stringArray.length - 2] = stringArray[stringArray.length - 2].slice(0, -1);
  return stringArray.join(' ');
};

const update = async (req, res, param) => {
  const id = Number(req.params.id);

  const updateOne = `UPDATE redflag
      SET ${param}=$1
      WHERE id=$2 returning *`;
  const values = [
    req.body[param],
    id,
  ];
  try {
    const { rows } = await db.query(updateOne, values);
    return res.status(200)
      .send({
        status: 200,
        data: [{
          id: rows[0].id,
          message: `Updated red-flag record's ${param}`,
        }],
      });
  } catch (error) {
    return res.status(500)
      .send({
        status: 500,
        error: 'Internal Server Error',
      });
  }
};


export { joinStrings, update };