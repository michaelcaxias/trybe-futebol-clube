import * as sinon from 'sinon';
import * as chai from 'chai';
import * as MatchsServices from '../database/services/MatchsServices';
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';

import Matchs from '../database/models/Matchs';
import Users from '../database/models/Users';
import { responseValidate } from '../database/utils/';

import {
  matchsGetMock,
  matchsGetProgressTrue,
  matchsGetProgressFalse,
  matchPostMock,
  userFindOneMock,
  matchFindAll,
} from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa uso do endpoint /matchs', () => {

  let chaiHttpResponse: Response;
  let payload = {};
  
  describe('Verifica funcionamento do método GET em casos de sucesso', () => {
    before(async () => {
      sinon.stub(Matchs, "findAll").resolves(matchFindAll as Matchs[]);
      sinon.stub(MatchsServices, "getMatchs").resolves(responseValidate(200, '', matchFindAll));
    })

    after((async () => {
      (Matchs.findAll as sinon.SinonStub).restore();
      (MatchsServices.getMatchs as sinon.SinonStub).restore();
    }))
    it('Retorna os dados esperados ao fazer uma requisição correta', async () => {
      chaiHttpResponse = await chai.request(app).get('/matchs');
      expect(chaiHttpResponse.body).to.deep.equal(matchsGetMock);
      expect(chaiHttpResponse.body).to.be.an('array');
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  })

  describe('Verifica funcionamento do método POST em casos de sucesso', () => {
    const authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY0NzcyNTQ4N30.liM1Oa_nEGRshFcjd4gz8JWPoTHXKML-dATZVOzKb2A"

    before(async () => {
      sinon.stub(MatchsServices, "postMatch").resolves(responseValidate(200, '', matchPostMock));
      sinon.stub(Users, "findOne").resolves(userFindOneMock as Users);
      sinon.stub(Matchs, "create").resolves(matchFindAll[0] as Matchs);
    })

    after((async () => {
      (MatchsServices.getMatchs as sinon.SinonStub).restore();
      (Matchs.create as sinon.SinonStub).restore();
      (Users.findOne as sinon.SinonStub).restore();
    }))

    it('Retorna os dados esperados ao fazer uma requisição correta', async () => {
      payload = {
        homeTeam: 16,
        homeTeamGoals: 1,
        awayTeam: 8,
        awayTeamGoals: 1,
        inProgress: false,
      }
      chaiHttpResponse = await chai.request(app).post('/matchs').send(payload).set('Authorization', authorization);
      expect(chaiHttpResponse.body).to.deep.equal(matchPostMock);
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  })

  describe('Verifica funcionamento do método GET em casos de erro', () => {
    before(async () => {
      sinon.stub(MatchsServices, "getMatchs").resolves(responseValidate(404, '', 'Could not find any Matchs'));
      sinon.stub(Matchs, "findAll").resolves();
    })

    after((async () => {
      (MatchsServices.getMatchs as sinon.SinonStub).restore();
      (Matchs.findAll as sinon.SinonStub).restore();
    }))

    it('Retorna um erro ao fazer uma requisição sem existir Matchs no DB', async () => {
      chaiHttpResponse = await chai.request(app).get('/matchs');
      expect(chaiHttpResponse.body).to.be.equal({ message: 'Could not find any Matchs' });
      expect(chaiHttpResponse.status).to.be.equal(404);
    });
  })

  describe('Verifica funcionamento do método POST em casos de falha', () => {
    let authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY0NzcyNTQ4N30.liM1Oa_nEGRshFcjd4gz8JWPoTHXKML-dATZVOzKb2A"

    before(async () => {
      sinon.stub(MatchsServices, "postMatch").resolves(responseValidate(401, "Invalid Token"));
      sinon.stub(Users, "findOne").resolves(userFindOneMock as Users);
      sinon.stub(Matchs, "create").resolves();
    })

    after((async () => {
      (MatchsServices.getMatchs as sinon.SinonStub).restore();
      (Matchs.create as sinon.SinonStub).restore();
      (Users.findOne as sinon.SinonStub).restore();
    }))

    it('Retorna uma mensagem de erro no envio de um token incorreto', async () => {
      payload = {
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
        inProgress: true
      }
      authorization = 'token incorreto'
      chaiHttpResponse = await chai.request(app).post('/matchs').send(payload).set('Authorization', authorization);
      expect(chaiHttpResponse.body).to.deep.equal({ message: "Invalid Token" });
      expect(chaiHttpResponse.status).to.be.equal(401);
    });

    it('Retorna uma mensagem de erro no não envio do campo "homeTeam"', async () => {
      payload = {
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
        inProgress: true
      }
      chaiHttpResponse = await chai.request(app).post('/matchs').send(payload).set('Authorization', authorization);
      expect(chaiHttpResponse.body).to.deep.equal({ message: "\"homeTeam\" is required" });
      expect(chaiHttpResponse.status).to.be.equal(401);
    });
  })
});

describe('Testa uso do endpoint /matchs?inProgress', () => {
  let chaiHttpResponse: Response;

  describe('Verifica funcionamento do método GET em casos de sucesso', () => {
    before(async () => {
      sinon.stub(MatchsServices, "getMatchsByProgress").resolves(responseValidate(200, '', matchsGetMock));
      sinon.stub(Matchs, "findAll").resolves(matchFindAll as Matchs[]);
    })

    after((async () => {
      (MatchsServices.getMatchsByProgress as sinon.SinonStub).restore();
      (Matchs.findAll as sinon.SinonStub).restore();
    }))
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
    before(async () => {
      sinon.stub(MatchsServices, "getMatchsByProgress").resolves(responseValidate(404, 'Could not find any Matchs'));
      sinon.stub(Matchs, "findAll").resolves([]);
    })

    after((async () => {
      (MatchsServices.getMatchsByProgress as sinon.SinonStub).restore();
      (Matchs.findAll as sinon.SinonStub).restore();
    }))

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
