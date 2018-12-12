import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import data from '../models/defunct';

const joinStrings = (strings) => {
  const stringArray = strings.map(x => `${x},`);
  stringArray[stringArray.length - 1] = `and ${stringArray[stringArray.length - 1].slice(0, -1)}`;
  stringArray[stringArray.length - 2] = stringArray[stringArray.length - 2].slice(0, -1);
  return stringArray.join(' ');
};

const update = async (req, res, param) => {
  const id = Number(req.params.id);
  const redFLagIndex = data.findIndex(x => x.id === id);
  data[redFLagIndex][param] = req.body[param];
  return res.status(200)
    .send({
      status: 200,
      data: [{
        id,
        message: `Updated red-flag record's ${param}`,
      }],
    });
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
};
