import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Metches from '../database/models/MetchesModel';

import matchesDTOMock from './mocnkMatches'

import { Response } from 'superagent';
import { any } from 'sequelize/types/lib/operators';

chai.use(chaiHttp);

const { expect } = chai;

describe('Crie o endpoint para manupulação de partidas /metches', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(Metches, 'findAll').resolves({matchesDTOMock} as any);
  });

  after(() => {
    (Metches.findAll as sinon.SinonStub).restore();
  });

  it('E possivel buscar todos as partidas e obter um retorno e status esperado.', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches')
    .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiJzZWNyZXRfYWRtaW4ifSwiaWF0IjoxNjU1NDA2MjA2LCJleHAiOjE2NTYwMTEwMDZ9.KMYDQoP1npY2pCgBWAzy6DxSpXCnqDcEYZ0G7iytGkw');
// fazer moc do bycript
    expect(chaiHttpResponse.status).to.be.equal(201);    
  });
});
