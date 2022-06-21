import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/TeamsModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Crie o endpoint para manupulação de partidas /teams', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(Teams, 'findOne').resolves({
      id: 1,
      teamName: 'Avaí/Kindermann',
    } as any);
  });

  after(() => {
    (Teams.findOne as sinon.SinonStub).restore();
  });

  it('E possivel buscar um time pelo seu id um retorno e status esperado.', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams/1');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('id');
    expect(chaiHttpResponse.body).to.have.property('teamName');
    // expect(chaiHttpResponse.body).to.have.property('awayTeam');
    // expect(chaiHttpResponse.body).to.have.property('homeTeamGoals');
    // expect(chaiHttpResponse.body).to.have.property('awayTeamGoals');
    // expect(chaiHttpResponse.body).to.have.property('inProgress');
  });
});
