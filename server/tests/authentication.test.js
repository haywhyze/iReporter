import chai from 'chai';
import { describe, it, before } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../app';
import dropTables from '../seed/dropTables';
import seed from '../../seed';

const { expect } = chai;

chai.use(chaiHttp);

describe('Auth User', () => {
  before(async () => {
    await dropTables();
    await seed();
  });

  describe('Sign Up user end-point', () => {
    it('should return 201 if all input are provided correctly', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          fullname: 'Ayomide Ajasin Oluyole',
          email: 'hay@haz.com',
          password: 'hhhhhdddkjkj',
          confirmPassword: 'hhhhhdddkjkj',
          phoneNumber: '08031961496',
          username: 'user007',
        });
      expect(res.status).to.eql(201);
      expect(res.body.data).to.exist;
      expect(res.body.data[0].token).to.be.a('string');
      expect(res.body.data[0].user.id).to.be.a('number');
    });
    it('should return 409 if user already exists', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          fullname: 'Ayomide Ajasin Oluyole',
          email: 'hay@haz.com',
          password: 'hhhhhdddkjkj',
          confirmPassword: 'hhhhhdddkjkj',
          phoneNumber: '08031961496',
          username: 'user007',
        });
      expect(res.status).to.eql(409);
      expect(res.body.error).to.exist;
    });
    it('should return 400 if first name is not provided', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          fullname: '',
          email: 'hayzx@haz.com',
          password: 'hhhhhdddkjkj',
          confirmPassword: 'hhhhhdddkjkj',
          phoneNumber: '08031961496',
          username: 'user0045',
        });
      expect(res.status).to.eql(400);
      expect(res.body.error).to.exist;
    });
    it('should return 400 if last name is not provided', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          fullname: 'Ayomide',
          email: 'hay@haz.com',
          password: 'hhhhhdddkjkj',
          confirmPassword: 'hhhhhdddkjkj',
          phoneNumber: '08031961496',
          username: 'user007',
        });
      expect(res.status).to.eql(400);
      expect(res.body.error).to.exist;
    });
    it('should return 400 if name provided is invalid', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          fullname: '89900999][[[][',
          email: 'hay@haz.com',
          password: 'hhhhhdddkjkj',
          confirmPassword: 'hhhhhdddkjkj',
          phoneNumber: '08031961496',
          username: 'user007',
        });
      expect(res.status).to.eql(400);
      expect(res.body.error).to.exist;
    });
    it('should return 400 if email is not provided', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          fullname: 'Ayomide Ajasin Oluyole',
          email: '',
          password: 'hhhhhdddkjkj',
          confirmPassword: 'hhhhhdddkjkj',
          phoneNumber: '08031961496',
          username: 'user007',
        });
      expect(res.status).to.eql(400);
      expect(res.body.error).to.exist;
    });
    it('should return 400 if email is invalid', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          fullname: 'Ayomide Ajasin Oluyole',
          email: 'hay@hazcom',
          password: 'hhhhhdddkjkj',
          confirmPassword: 'hhhhhdddkjkj',
          phoneNumber: '08031961496',
          username: 'user007',
        });
      expect(res.status).to.eql(400);
      expect(res.body.error).to.exist;
    });
    it('should return 400 if password doesnt match', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          fullname: 'Ayomide Ajasin Oluyole',
          email: 'hay@haz.com',
          password: 'hhhhhdddkjkj',
          confirmPassword: 'hhhhhd',
          phoneNumber: '08031961496',
          username: 'user007',
        });
      expect(res.status).to.eql(400);
      expect(res.body.error).to.exist;
    });
    it('should return 400 if password is too short', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          fullname: 'Ayomide Ajasin Oluyole',
          email: 'hay@haz.com',
          password: 'hh',
          confirmPassword: 'hh',
          phoneNumber: '08031961496',
          username: 'user007',
        });
      expect(res.status).to.eql(400);
      expect(res.body.error).to.exist;
    });
    it('should return 400 if password is not provided', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          fullname: 'Ayomide Ajasin Oluyole',
          email: 'hay@haz.com',
          password: '',
          confirmPassword: '',
          phoneNumber: '08031961496',
          username: 'user007',
        });
      expect(res.status).to.eql(400);
      expect(res.body.error).to.exist;
    });
    it('should return 400 if Phone Number is not provided', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          fullname: 'Ayomide Ajasin Oluyole',
          email: 'hay@haz.com',
          password: 'abcdefgh',
          confirmPassword: 'abcdefgh',
          phoneNumber: '',
          username: 'user007',
        });
      expect(res.status).to.eql(400);
      expect(res.body.error).to.exist;
    });
    it('should return 400 if Phone Number is not valid', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          fullname: 'Ayomide Ajasin Oluyole',
          email: 'hay@haz.com',
          password: 'abcdefgh',
          confirmPassword: 'abcdefgh',
          phoneNumber: '0803',
          username: 'user007',
        });
      expect(res.status).to.eql(400);
      expect(res.body.error).to.exist;
    });
    it('should return 400 if username is not provided', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          fullname: 'Ayomide Ajasin Oluyole',
          email: 'hay@haz.com',
          password: 'abcdefgh',
          confirmPassword: 'abcdefgh',
          phoneNumber: '08031961496',
          username: '',
        });
      expect(res.status).to.eql(400);
      expect(res.body.error).to.exist;
    });
    it('should return 400 if username is invalid', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          fullname: 'Ayomide Ajasin Oluyole',
          email: 'hay@haz.com',
          password: 'abcdefgh',
          confirmPassword: 'abcdefgh',
          phoneNumber: '08031961496',
          username: '/./././.',
        });
      expect(res.status).to.eql(400);
      expect(res.body.error).to.exist;
    });
  });

  // describe('Sign In user end-point', () => {
  //   it('should login user if provided with right values', async () => {
  //     const res = await chai.request(app)
  //       .post('/api/v1/auth/login')
  //       .send({
  //         email: 'haywhyze@yahoo.com',
  //         password: '(adminPASSWORD2018)',
  //       });
  //     expect(res.status).to.eql(200);
  //   });
  //   it('should not login user if email is not provided', async () => {
  //     const res = await chai.request(app)
  //       .post('/api/v1/auth/login')
  //       .send({
  //         email: '',
  //         password: 'haywhyze',
  //       });
  //     expect(res.status).to.eql(404);
  //   });
  //   it('should not login user with unregistered email', async () => {
  //     const res = await chai.request(app)
  //       .post('/api/v1/auth/login')
  //       .send({
  //         email: 'haywhyze@google.com',
  //         password: '(adminPASSWORD2018)',
  //       });
  //     expect(res.status).to.eql(404);
  //   });
  //   it('should not login user with wrong password', async () => {
  //     const res = await chai.request(app)
  //       .post('/api/v1/auth/login')
  //       .send({
  //         email: 'haywhyze@yahoo.com',
  //         password: '(admingfgfgf',
  //       });
  //     expect(res.status).to.eql(404);
  //   });
  // });
});
