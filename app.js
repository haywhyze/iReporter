import express from 'express';
import bodyParser from 'body-parser';
import router from './server/routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/v1/', (req, res) => {
  const welcome = '<h1>Welcome to iReporter API version 1.0.0. The application is live on here';
  res.status(200).send(welcome);
});

app.use(router);

app.all('*', (req, res) => {
  res.status(404).send('<h2>Well!!! This is Embarrasing</h2><p>There are no resources here. Check the documentation here for valid routes</p>');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  /* eslint-disable-next-line no-console */
  console.log(`server running on port ${PORT}`);
});

export default app;
