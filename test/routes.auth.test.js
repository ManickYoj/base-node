process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../app.js');
const db = require('../db.js');

describe('routes : auth', () => {
  beforeEach(() => {
    return db.migrate.rollback()
    .then(() => { return db.migrate.latest(); });
  });

  afterEach(() => {
    return db.migrate.rollback();
  });
});

describe('POST /auth/register', () => {
  it('should register a new user', (done) => {
    chai.request(server)
    .post('/auth/register')
    .send({
      username: 'nick',
      password: 'francisci'
    })
    .end((err, res) => {
      should.not.exist(err);
      res.redirects.length.should.eql(0);
      res.status.should.eql(200);
      res.type.should.eql('application/json');
      res.body.status.should.eql('success');
      done();
    });
  });
});