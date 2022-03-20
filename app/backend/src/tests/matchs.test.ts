import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';

import Matchs from '../database/models/Matchs';
import { matchsGetMock, matchsGetProgressTrue, matchsGetProgressFalse } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa uso do endpoint /matchs', () => {

  let chaiHttpResponse: Response;
  
  describe('Verifica funcionamento do método GET em casos de sucesso', () => {
    it('Retorna os dados esperados ao fazer uma requisição correta', async () => {
      chaiHttpResponse = await chai.request(app).get('/matchs');
      expect(chaiHttpResponse.body).to.deep.equal(matchsGetMock);
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  })
  describe('Verifica funcionamento do método GET em casos de erro', () => {
    before(() => {
      sinon.stub(Matchs, "findAll").resolves([]);
    })

    after(() => {
      (Matchs.findAll as sinon.SinonStub).restore();
    })

    it('Retorna um erro ao fazer uma requisição sem existir Matchs no DB', async () => {
      chaiHttpResponse = await chai.request(app).get('/matchs');
      expect(chaiHttpResponse.body).to.be.equal({ message: 'Could not find any Matchs' });
      expect(chaiHttpResponse.status).to.be.equal(404);
    });
  })
});

describe('Testa uso do endpoint /matchs?inProgress', () => {
  let chaiHttpResponse: Response;

  describe('Verifica funcionamento do método GET em casos de sucesso', () => {
    it('Retorna os dados esperados ao fazer uma requisição correta utilizando inProgress=true', async () => {
      chaiHttpResponse = await chai.request(app).get('/matchs/?inProgress=true');
      expect(chaiHttpResponse.body).to.deep.equal(matchsGetProgressTrue);
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
    it('Retorna os dados esperados ao fazer uma requisição correta utilizando inProgress=false', async () => {
      chaiHttpResponse = await chai.request(app).get('/matchs/?inProgress=false');
      expect(chaiHttpResponse.body).to.deep.equal(matchsGetProgressFalse);
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  })
  describe('Verifica funcionamento do método GET em casos de erro', () => {
    before(() => {
      sinon.stub(Matchs, "findAll").resolves([]);
    })

    after(() => {
      (Matchs.findAll as sinon.SinonStub).restore();
    })

    it('Retorna um erro ao fazer uma requisição com inProgress=true sem existir Matchs no DB', async () => {
      chaiHttpResponse = await chai.request(app).get('/matchs/?inProgress=true');
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Could not find any Matchs' });
      expect(chaiHttpResponse.status).to.be.equal(404);
    });
    it('Retorna um erro ao fazer uma requisição com inProgress=true sem existir Matchs no DB', async () => {
      chaiHttpResponse = await chai.request(app).get('/matchs/?inProgress=false');
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Could not find any Matchs' });
      expect(chaiHttpResponse.status).to.be.equal(404);
    });
  })
});
