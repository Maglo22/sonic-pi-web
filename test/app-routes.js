const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

// configure chai
chai.use(chaiHttp);
chai.should();

// test index routes
describe('index routes', () => {
  describe('GET', () => {
    it('should get app index', (done) => {
      chai.request(app)
          .get('/')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
    });
  });
});

// test pads routes
describe('pads routes', () => {
  describe('GET', () => {
    it('should get pads index', (done) => {
      chai.request(app)
          .get('/pads')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
    });

    it('should create a new pad', (done) => {
      const id = 'pad-test';
      chai.request(app)
          .get(`/pads/new/${id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
    });

    it('should join the pad', (done) => {
      const id = 'pad-test';
      const user = 'username';
      const color = '8AF1FF'
      chai.request(app)
          .get(`/pads/${id}.${user}.${color}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
    });

    it('should delete a pad', (done) => {
      const id = 'pad-test';
      chai.request(app)
          .get(`/pads/delete/${id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
    });

  });
});