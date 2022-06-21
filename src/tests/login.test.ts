import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/UserModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Crie o endpoint POST /login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(Example, 'findOne').resolves({
      dataValues: {
        id: 1,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password:
          '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
      },
    } as Example);
  });

  after(() => {
    (Example.findOne as sinon.SinonStub).restore();
  });

  it('E possivel fazer login e obter um retorno e status esperado.', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    });

    expect(chaiHttpResponse.status).to.be.equal(200);  
    expect(chaiHttpResponse.body.user).to.have.property('id');
    expect(chaiHttpResponse.body.user).to.have.property('username');
    expect(chaiHttpResponse.body.user).to.have.property('role');
    expect(chaiHttpResponse.body.user).to.have.property('email');
    expect(chaiHttpResponse.body).to.have.property('token');
  });
});
