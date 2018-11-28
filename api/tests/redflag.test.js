import chai from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../../app';

const should = chai.should();

chai.use(chaiHttp);

describe('GET /api/v1/', () => {
  it('should get the homepage', (done) => {
    chai.request(app)
      .get('/api/v1/red-flags')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
