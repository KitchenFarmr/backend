const app = require("../app.js");
const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;

chai.config.includeStack = true;

const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe("Home page render", () => {
  it("should open a webpage", (done) => {
    chai
    .request(app)
    .get("/")
    .end((error, response) => {
      if (error) done(error);
      expect(response).to.have.status(200);
      done();
    })
  })
})
