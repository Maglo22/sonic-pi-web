/*
Tests for the app routes.
This will test if the etherpad-lite api client is working in the app.
Don't forget to change the exported var in ehterpad-api.js if you have another
etherpad instance for testing.
*/
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

// configure chai
chai.use(chaiHttp);
chai.should();


describe('test express app routes', () => {
  // pads
  describe('pads routes', () => {
    it('gets pads index', (done) => {
      chai.request(app)
          .get('/pads')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
    });

    it('creates a new pad', (done) => {
      const id = 'pad-test';
      chai.request(app)
          .get(`/pads/new/${id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
    });

    it('joins the pad', (done) => {
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

    it('deletes the pad', (done) => {
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

  // index
  describe('index routes', () => {
    it('gets app index', (done) => {
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

