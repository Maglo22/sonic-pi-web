const chai = require('chai');
const chaiHttp = require('chai-http');

// configure chai
chai.use(chaiHttp);
chai.should();

// etherpad-api url & key
const etherpad_api_url = 'http://localhost:9001/api/1.2.12';
const apikey = '?apikey=cf9d1625ffd031705fe18419e3e3b911b9643ede36955459dc6bf7e295071d8a';

describe('test etherpad api connection',() => {
  it('lists all pads', (done) => {
    const apiCall = '/listAllPads';
    chai.request(etherpad_api_url)
        .get(apiCall + apikey)
        .end((err, res) => {
          res.should.have.status(200);
          // success response -> { code: 0, message:"ok", data: { padIDs: [...] } }
          chai.assert.equal(res.body.code, 0);
          chai.assert.equal(res.body.message, 'ok');
          chai.assert.isNotNull(res.body.data);
          done();
    });
  });

  it('creates pad', (done) => {
    const apiCall = '/createPad';
    const args = '&padID=test-pad';
    chai.request(etherpad_api_url)
        .get(apiCall + apikey + args)
        .end((err, res) => {
          res.should.have.status(200);
          // success response -> { code: 0, message:"ok", data: null }
          chai.assert.equal(res.body.code, 0);
          chai.assert.equal(res.body.message, 'ok'); 
          done();
    });
  });

  it('gets pad text', (done) => {
    const apiCall = '/getText';
    const args = '&padID=test-pad';
    chai.request(etherpad_api_url)
        .get(apiCall + apikey + args)
        .end((err, res) => {
          res.should.have.status(200);
          // success response -> { code: 0, message:"ok", data: { text:"Welcome Text" } }
          chai.assert.equal(res.body.code, 0);
          chai.assert.equal(res.body.message, 'ok');
          chai.assert.isNotNull(res.body.data);
          done();
    });
  });

  it('deletes pad', (done) => {
    const apiCall = '/deletePad';
    const args = '&padID=test-pad';
    chai.request(etherpad_api_url)
        .get(apiCall + apikey + args)
        .end((err, res) => {
          res.should.have.status(200);
          // success response -> { code: 0, message:"ok", data: null }
          chai.assert.equal(res.body.code, 0);
          chai.assert.equal(res.body.message, 'ok'); 
          done();
    });
  });

});