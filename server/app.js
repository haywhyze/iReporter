import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './routes';
import 'babel-polyfill';

dotenv.config();
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  const welcome = 'Welcome to iReporter API version 1.0.0.';
  res.status(200).send({
    status: 200,
    message: welcome,
  });
});

app.use(router);

app.all('*', (req, res) => {
  res.status(404).send({
    status: 404,
    error: 'Page Not Found',
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  /* eslint-disable-next-line no-console */
  console.log(`server running on port ${PORT}`);
});

export default app;
