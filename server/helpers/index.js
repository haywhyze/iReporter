import data from '../models/red-flag';

const joinStrings = (strings) => {
  const stringArray = strings.map(x => `${x},`);
  stringArray[stringArray.length - 1] = `and ${stringArray[stringArray.length - 1].slice(0, -1)}`;
  stringArray[stringArray.length - 2] = stringArray[stringArray.length - 2].slice(0, -1);
  return stringArray.join(' ');
};

const update = (req, res, param) => {
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


export { joinStrings, update };
