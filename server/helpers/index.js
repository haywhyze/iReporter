import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'babel-polyfill';
import db from '../models/db';

const joinStrings = (strings) => {
  const stringArray = strings.map(x => `${x},`);
  stringArray[stringArray.length - 1] = `and ${stringArray[stringArray.length - 1].slice(0, -1)}`;
  stringArray[stringArray.length - 2] = stringArray[stringArray.length - 2].slice(0, -1);
  return stringArray.join(' ');
};

const resolveType = (req) => {
  const path = req.url.split('/');
  let type = path[3];
  if (type === 'red-flags') {
    type = 'redflag';
  } else {
    type = 'intervention';
  }
  return type;
};


const update = async (req, res, param) => {
  const id = Number(req.params.id);
  const type = resolveType(req);
  const updateOne = `UPDATE ${type}
      SET ${param}=$1
      WHERE id=$2 AND created_by = $3 returning *`;
  const values = [
    req.body[param],
    id,
    req.user.id,
  ];
  try {
    const { rows } = await db.query(updateOne, values);
    return res.status(200)
      .send({
        status: 200,
        data: [{
          id: rows[0].id,
          message: `Updated ${type} record's ${param}`,
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

const splitName = (fullName) => {
  const namesArr = fullName.split(' ');
  /* eslint-disable-next-line prefer-const */
  let [firstName, lastName, ...otherNames] = namesArr;
  otherNames = otherNames.join(' ');
  return { firstName, lastName, otherNames };
};

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const comparePassword = (hashedPassword, password) => bcrypt.compareSync(password, hashedPassword);

const generateToken = (id) => {
  const token = jwt.sign({
    userId: id,
  },
  process.env.SECRET, { expiresIn: '7d' });
  return token;
};

export {
  joinStrings,
  update,
  splitName,
  hashPassword,
  comparePassword,
  generateToken,
  resolveType,
};
