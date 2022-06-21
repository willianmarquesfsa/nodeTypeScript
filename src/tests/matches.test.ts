import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Metches from '../database/models/MetchesModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Crie o endpoint para manupulação de partidas /metches', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(Metches, 'create').resolves({
      id: 49,
        homeTeam: 16,
        awayTeam: 9,
        homeTeamGoals: 6,
        awayTeamGoals: 3,
        inProgress: false,      
    } as Metches);
  });

  after(() => {
    (Metches.create as sinon.SinonStub).restore();
  });

  it('E possivel inserir uma partida e obter um retorno e status esperado.', async () => {
    chaiHttpResponse = await chai.request(app).post('/matches').set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiJzZWNyZXRfYWRtaW4ifSwiaWF0IjoxNjU1NDA2MjA2LCJleHAiOjE2NTYwMTEwMDZ9.KMYDQoP1npY2pCgBWAzy6DxSpXCnqDcEYZ0G7iytGkw').send({
      homeTeam: 16,
      awayTeam: 9,
      homeTeamGoals: 6,
      awayTeamGoals: 3,
      inProgress: false,
    });

    expect(chaiHttpResponse.status).to.be.equal(201);  
    expect(chaiHttpResponse.body).to.have.property('id');
    expect(chaiHttpResponse.body).to.have.property('homeTeam');
    expect(chaiHttpResponse.body).to.have.property('awayTeam');
    expect(chaiHttpResponse.body).to.have.property('homeTeamGoals');
    expect(chaiHttpResponse.body).to.have.property('awayTeamGoals');
    expect(chaiHttpResponse.body).to.have.property('inProgress');
  });
});
