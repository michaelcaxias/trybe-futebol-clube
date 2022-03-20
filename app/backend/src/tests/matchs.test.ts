import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';

import Matchs from '../database/models/Matchs';
import Users from '../database/models/Users';

import {
  matchsGetMock,
  matchsGetProgressTrue,
  matchsGetProgressFalse,
  matchPostMock,
  userFindOneMock,
} from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa uso do endpoint /matchs', () => {

  let chaiHttpResponse: Response;
  let payload = {};
  
  describe('Verifica funcionamento do método GET em casos de sucesso', () => {
    it('Retorna os dados esperados ao fazer uma requisição correta', async () => {
      chaiHttpResponse = await chai.request(app).get('/matchs');
      console.log(chaiHttpResponse);
      expect(chaiHttpResponse.body).to.deep.equal(matchsGetMock);
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  })

  describe('Verifica funcionamento do método POST em casos de sucesso', () => {
    const authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY0NzcyNTQ4N30.liM1Oa_nEGRshFcjd4gz8JWPoTHXKML-dATZVOzKb2A"

    before( async () => {
      sinon.stub(Users, "findOne").resolves(userFindOneMock as Users);
    })

    after((async () => {
      (Users.findOne as sinon.SinonStub).restore();
    }))

    it('Retorna os dados esperados ao fazer uma requisição correta', async () => {
      payload = {
        homeTeam: 16,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
        inProgress: true
      }
      chaiHttpResponse = await chai.request(app).post('/matchs').send(payload).set('Authorization', authorization);
      expect(chaiHttpResponse.body).to.deep.equal(matchPostMock);
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
    it('Retorna um erro ao fazer uma requisição com inProgress=false sem existir Matchs no DB', async () => {
      chaiHttpResponse = await chai.request(app).get('/matchs/?inProgress=false');
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Could not find any Matchs' });
      expect(chaiHttpResponse.status).to.be.equal(404);
    });
  })
});
