const app = require('../app.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const cleaner = require('../utils');

const { assert } = chai;
const fetch = require('node-fetch');

chai.config.includeStack = true;

const { expect } = chai;
const should = chai.should();
chai.use(chaiHttp);

describe('Results page render', () => {
  // check for correct json
  it('should recieve json data', (done) => {
    chai
      .request(app)
      .get('/results/94103')
      .end((error, response) => {
        if (error) done(error);
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('array');
        done();
      });
  }).timeout(10000);
});
