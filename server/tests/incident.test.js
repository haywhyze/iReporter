import chai from 'chai';
import { describe, it, before } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../app';
import dropTables from '../seed/dropTables';
import seed from '../../seed';

const { expect } = chai;

chai.use(chaiHttp);

const token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTU0NDc2MjAwOCwiZXhwIjoxNTQ1MzY2ODA4fQ.zThz_sALGAaQ7xxPeTar3oa6_6035LbSE7ooDKAl9Sk';
// let token2;

describe('Incident Route', () => {
  before(async () => {
    await dropTables();
    await seed();
  });

  describe('GET /api/v1/red-flags', () => {
    it('should return 401 on users not logged in', async () => {
      const res = await chai.request(app)
        .get('/api/v1/red-flags');
      expect(res.status).to.equal(401);
    });
    it('should return 400 for invalid token', async () => {
      const res = await chai.request(app)
        .get('/api/v1/red-flags')
        .set('x-access-token', 'justarandomddadd');
      expect(res.status).to.equal(401);
    });
    it('should get all red-flags for logged in user', async () => {
      const res = await chai.request(app)
        .get('/api/v1/red-flags')
        .set('x-access-token', token1);
      expect(res.status).to.equal(200);
    });
  });

  describe('GET /api/v1/red-flags/:id', () => {
    it('should send a 400 error if ID is not valid', async () => {
      const res = await chai.request(app)
        .get('/api/v1/red-flags/1yut')
        .set('x-access-token', token1);
      expect(res.status).to.equal(400);
      expect(res.body.error).to.exist;
    });
    it('should send a 404 error if ID does not exist', async () => {
      const res = await chai.request(app)
        .get('/api/v1/red-flags/15')
        .set('x-access-token', token1);
      expect(res.status).to.equal(404);
      expect(res.body.error).to.exist;
    });
    it('should get a specific red-flag if ID exist', async () => {
      const res = await chai.request(app)
        .get('/api/v1/red-flags/1')
        .set('x-access-token', token1);
      expect(res.status).to.equal(200);
    });
  });
});
