/* eslint-disable no-unused-expressions */
import chai from 'chai';
import { describe, it, beforeEach } from 'mocha';
import chaiHttp from 'chai-http';
// import moment from 'moment';
import app from '../../app';

const { expect } = chai;

chai.use(chaiHttp);

describe('Red Flags', () => {
  beforeEach((done) => {
    done();
  });

  describe('GET /api/v1/', () => {
    it('should get the homepage', (done) => {
      chai.request(app)
        .get('/api/v1/')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.exist;
          done();
        });
    });
  });


  describe('GET /api/v1/red-flags', () => {
    it('should get all red-flags if records exist', (done) => {
      chai.request(app)
        .get('/api/v1/red-flags')
        .end((err, res) => {
          expect(res).to.exist;
          expect(res.status).to.equal(200);
          expect(res.body.status).to.exist;
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /api/v1/red-flags/<red-flag-id>', () => {
    it('should get a specific red-flag if ID exist', (done) => {
      chai.request(app)
        .get('/api/v1/red-flags/1')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.exist;
          expect(res.body.data[0].id).to.equal(1);
          done();
        });
    });

    it('should send a 404 error if ID does not exist', (done) => {
      chai.request(app)
        .get('/api/v1/red-flags/15')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.exist;
          expect(res.body.error).to.exist;
          expect(res.body.error).to.equal('red-flag record ID provided does not exist');
          done();
        });
    });

    it('should send a 400 error if ID is not valid', (done) => {
      chai.request(app)
        .get('/api/v1/red-flags/1yut')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.exist;
          expect(res.body.error).to.exist;
          expect(res.body.error).to.equal('red-flag ID value provided is not valid');
          done();
        });
    });
  });

  describe('POST /api/v1/red-flags', () => {
    it('should create a new red flag if all field are filled appropriately', (done) => {
      chai.request(app)
        .post('/api/v1/red-flags')
        .send({
          subject: 'Possible Corruption at Lagos Revenue Office',
          comment: 'lorem ipsum dictum non consectetur a erat nam at lectus urna duis convallis convallis tellus id interdum velit laoreet id donec ultrices tincidunt arcu non sodales neque sodales ut etiam sit amet nisl purus in mollis nunc sed id semper risus in',
          type: 'red-flag',
          location: '(6.620872012064693, 3.3602339029312134)',
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.status).to.exist;
          expect(res.body.data[0].message).to.equal('Created red-flag record');
          done();
        });
    });

    it('should not create a new red flag if comment field is empty or absent', (done) => {
      chai.request(app)
        .post('/api/v1/red-flags')
        .send({
          subject: 'Possible Corruption at Lagos Revenue Office',
          type: 'red-flag',
          location: '(6.620872012064693, 3.3602339029312134)',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.exist;
          expect(res.body.error).to.exist;
          expect(res.body.error).to.include('comment');
          done();
        });
    });

    it('should not create a new red flag if location field is empty or absent', (done) => {
      chai.request(app)
        .post('/api/v1/red-flags')
        .send({
          subject: 'Possible Corruption at Lagos Revenue Office',
          type: 'red-flag',
          comment: 'lorem ipsum dictum non consectetur a erat nam at lectus urna duis convallis convallis tellus id interdum velit laoreet id donec ultrices tincidunt arcu non sodales neque sodales ut etiam sit amet nisl purus in mollis nunc sed id semper risus in',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.exist;
          expect(res.body.error).to.exist;
          expect(res.body.error).to.include('location');
          done();
        });
    });

    it('should not create a new red flag if type field is absent or empty', (done) => {
      chai.request(app)
        .post('/api/v1/red-flags')
        .send({
          subject: 'Possible Corruption at Lagos Revenue Office',
          comment: 'lorem ipsum dictum non consectetur a erat nam at lectus urna duis convallis convallis tellus id interdum velit laoreet id donec ultrices tincidunt arcu non sodales neque sodales ut etiam sit amet nisl purus in mollis nunc sed id semper risus in',
          location: '(6.620872012064693, 3.3602339029312134)',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.exist;
          expect(res.body.error).to.exist;
          expect(res.body.error).to.include('type');
          done();
        });
    });

    it('should not create a new red flag if comment field is too short or too long', (done) => {
      chai.request(app)
        .post('/api/v1/red-flags')
        .send({
          subject: 'Possible Corruption at Lagos Revenue Office',
          type: 'red-flag',
          comment: 'lorem ipsum',
          location: '(6.620872012064693, 3.3602339029312134)',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.exist;
          expect(res.body.error).to.exist;
          expect(res.body.error).to.equal('Comment too short or too long');
          done();
        });
    });

    it('should not create a new red flag if location is not valid Lat Long Coordinates', (done) => {
      chai.request(app)
        .post('/api/v1/red-flags')
        .send({
          subject: 'Possible Corruption at Lagos Revenue Office',
          type: 'red-flag',
          comment: 'lorem ipsum',
          location: '(6.620872012064693, -190)',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.exist;
          expect(res.body.error).to.exist;
          expect(res.body.error).to.equal('Lat Long coordinates not valid');
          done();
        });
    });

    it('should not create a new red flag if type is not an accepted value', (done) => {
      chai.request(app)
        .post('/api/v1/red-flags')
        .send({
          subject: 'Possible Corruption at Lagos Revenue Office',
          type: 'blue-flag',
          comment: 'lorem ipsum',
          location: '(6.620872012064693, 3.3602339029312134)',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.exist;
          expect(res.body.error).to.exist;
          expect(res.body.error).to.equal('Type not of accepted value');
          done();
        });
    });
  });


  describe('PATCH api/v1/red-flags/<red-flag-id>/location', () => {
    it('should change the location of the specified record if redflag id and new location value is valid', (done) => {
      chai.request(app)
        .patch('/api/v1/red-flags/1/location')
        .send({
          location: '(6.5927921165779075, 3.3561009169617364)',
        }).end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.exist;
          expect(res.body.data[0].id).to.equal(1);
          expect(res.body.data[0].message).to.equal('Updated red-flag record\'s location');
          done();
        });
    });

    it('should not change the location if location field is missing or empty', (done) => {
      chai.request(app)
        .patch('/api/v1/red-flags/1/location')
        .send({
          location: '',
        }).end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.exist;
          expect(res.body.error).to.equal('No location value provided');
          done();
        });
    });

    it('should not change the location if location value is not a valid Lat Long Coordinates', (done) => {
      chai.request(app)
        .patch('/api/v1/red-flags/1/location')
        .send({
          location: '(6.620872012064693, -190)',
        }).end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.exist;
          expect(res.body.error).to.equal('Lat Long coordinates not valid');
          done();
        });
    });

    it('should not change the location if red-flag ID does not exist, 404', (done) => {
      chai.request(app)
        .patch('/api/v1/red-flags/12/location')
        .send({
          location: '(6.620872012064693, 3.3561009169617364)',
        }).end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.exist;
          expect(res.body.error).to.equal('red-flag record ID provided does not exist');
          done();
        });
    });

    it('should not change the location if red-flag ID value is invalid, 400', (done) => {
      chai.request(app)
        .patch('/api/v1/red-flags/shade/location')
        .send({
          location: '(6.620872012064693, 3.3561009169617364)',
        }).end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.exist;
          expect(res.body.error).to.equal('red-flag ID value provided is not valid');
          done();
        });
    });
  });


  describe('PATCH api/v1/red-flags/<red-flag-id>/comment', () => {
    it('should change the comment of the specified record if redflag id and new comment value is valid', (done) => {
      chai.request(app)
        .patch('/api/v1/red-flags/1/comment')
        .send({
          comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum soluta facilis cumque culpa delectus, quibusdam minima ducimus, eaque aperiam minus non quam. Ad hic odio, pariatur vero eius asperiores exercitationem!',
        }).end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.exist;
          expect(res.body.data[0].id).to.be.equal(1);
          expect(res.body.data[0].message).to.equal('Updated red-flag record\'s comment');
          done();
        });
    });

    it('should not change the comment if comment field is missing or empty', (done) => {
      chai.request(app)
        .patch('/api/v1/red-flags/1/comment')
        .send({
          comment: '',
        }).end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.exist;
          expect(res.body.error).to.equal('No comment value provided');
          done();
        });
    });

    it('should not change the comment if comment value is too short or too long', (done) => {
      chai.request(app)
        .patch('/api/v1/red-flags/1/comment')
        .send({
          comment: 'Too short',
        }).end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.exist;
          expect(res.body.error).to.equal('Comment too short or too long');
          done();
        });
    });

    it('should not change the comment if red-flag ID does not exist, 404', (done) => {
      chai.request(app)
        .patch('/api/v1/red-flags/12/comment')
        .send({
          comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum soluta facilis cumque culpa delectus, quibusdam minima ducimus, eaque aperiam minus non quam. Ad hic odio, pariatur vero eius asperiores exercitationem!',
        }).end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.exist;
          expect(res.body.error).to.equal('red-flag record ID provided does not exist');
          done();
        });
    });

    it('should not change the comment if red-flag ID value is invalid, 400', (done) => {
      chai.request(app)
        .patch('/api/v1/red-flags/shade/comment')
        .send({
          comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum soluta facilis cumque culpa delectus, quibusdam minima ducimus, eaque aperiam minus non quam. Ad hic odio, pariatur vero eius asperiores exercitationem!',
        }).end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.exist;
          expect(res.body.error).to.equal('red-flag ID value provided is not valid');
          done();
        });
    });
  });


  describe('DELETE /api/v1/red-flags/<red-flag-id>', () => {
    it('should delete red flag record if red-flag ID exist', (done) => {
      chai.request(app)
        .delete('/api/v1/red-flags/1')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.exist;
          expect(res.body.data[0].message).to.equal('red-flag record has been deleted');
          done();
        });
    });

    it('should not delete record if red-flag ID does not exist, 404', (done) => {
      chai.request(app)
        .delete('/api/v1/red-flags/12')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.exist;
          expect(res.body.error).to.equal('red-flag record ID provided does not exist');
          done();
        });
    });
    it('should not delete record if red-flag ID value is invalid, 400', (done) => {
      chai.request(app)
        .delete('/api/v1/red-flags/shade')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.exist;
          expect(res.body.error).to.equal('red-flag ID value provided is not valid');
          done();
        });
    });
  });
});
