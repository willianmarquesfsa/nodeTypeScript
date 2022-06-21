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
    sinon.stub(Teams, 'findAll').resolves([
      {
        id: 1,
        teamName: 'Avaí/Kindermann',
      },
      {
        id: 2,
        teamName: 'Bahia',
      },
      {
        id: 3,
        teamName: 'Botafogo',
      },
      {
        id: 4,
        teamName: 'Corinthians',
      },
      {
        id: 5,
        teamName: 'Cruzeiro',
      },
      {
        id: 6,
        teamName: 'Ferroviária',
      },
      {
        id: 7,
        teamName: 'Flamengo',
      },
      {
        id: 8,
        teamName: 'Grêmio',
      },
      {
        id: 9,
        teamName: 'Internacional',
      },
      {
        id: 10,
        teamName: 'Minas Brasília',
      },
      {
        id: 11,
        teamName: 'Napoli-SC',
      },
      {
        id: 12,
        teamName: 'Palmeiras',
      },
      {
        id: 13,
        teamName: 'Real Brasília',
      },
      {
        id: 14,
        teamName: 'Santos',
      },
      {
        id: 15,
        teamName: 'São José-SP',
      },
      {
        id: 16,
        teamName: 'São Paulo',
      },
    ] as any);
  });

  after(() => {
    (Teams.findAll as sinon.SinonStub).restore();
  });

  it('E possivel buscar todos os times e obter um retorno e status esperado.', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams');

    expect(chaiHttpResponse.status).to.be.equal(200);
    // expect(chaiHttpResponse.body).to.have.property('id');
    // expect(chaiHttpResponse.body).to.have.property('homeTeam');
    // expect(chaiHttpResponse.body).to.have.property('awayTeam');
    // expect(chaiHttpResponse.body).to.have.property('homeTeamGoals');
    // expect(chaiHttpResponse.body).to.have.property('awayTeamGoals');
    // expect(chaiHttpResponse.body).to.have.property('inProgress');
  });
});
