import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

import {
  clubsGetMock,
  matchFindAll
} from './mocks';

import Clubs from '../database/models/Clubs';
import Matchs from '../database/models/Matchs';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa uso do endpoint /leaderboard/home', () => {

  let chaiHttpResponse: Response;

  describe('Verifica funcionamento do método GET em casos de sucesso', () => {
    before(async () => {
      sinon.stub(Clubs, "findAll").resolves(clubsGetMock as Clubs[]);
      sinon.stub(Matchs, "findAll").resolves(matchFindAll as Matchs[]);
    })
     
    after(async () => {
      (Clubs.findAll as sinon.SinonStub).restore();
      (Matchs.findAll as sinon.SinonStub).restore();
    })
    
    it('Retorna os dados esperados ao fazer uma requisição correta', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
      expect(chaiHttpResponse.body[0]).to.have.property('name')
      expect(chaiHttpResponse.body[0]).to.have.property('totalPoints')
      expect(chaiHttpResponse.body[0]).to.have.property('totalVictories')
      expect(chaiHttpResponse.body[0]).to.have.property('totalDraws')
      expect(chaiHttpResponse.body[0]).to.have.property('totalLosses')
      expect(chaiHttpResponse.body[0]).to.have.property('goalsFavor')
      expect(chaiHttpResponse.body[0]).to.have.property('goalsOwn')
      expect(chaiHttpResponse.body[0]).to.have.property('goalsBalance')
      expect(chaiHttpResponse.body[0]).to.have.property('totalGames')
      expect(chaiHttpResponse.body[0]).to.have.property('efficiency')
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  })
  describe('Verifica funcionamento do método GET em casos de sucesso', () => {
    before(async () => {
      sinon.stub(Clubs, "findAll").resolves([]);
      sinon.stub(Matchs, "findAll").resolves([]);
    })
     
    after(async () => {
      (Clubs.findAll as sinon.SinonStub).restore();
      (Matchs.findAll as sinon.SinonStub).restore();
    })
    
    it('Retorna os dados esperados ao fazer uma requisição correta', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Clubs not found!' })
      expect(chaiHttpResponse.status).to.be.equal(404);
    });
  })
});

describe('Testa uso do endpoint /leaderboard/away', () => {

  let chaiHttpResponse: Response;

  describe('Verifica funcionamento do método GET em casos de sucesso', () => {
    before(async () => {
      sinon.stub(Clubs, "findAll").resolves(clubsGetMock as Clubs[]);
      sinon.stub(Matchs, "findAll").resolves(matchFindAll as Matchs[]);
    })
     
    after(async () => {
      (Clubs.findAll as sinon.SinonStub).restore();
      (Matchs.findAll as sinon.SinonStub).restore();
    })
    
    it('Retorna os dados esperados ao fazer uma requisição correta', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/away');
      expect(chaiHttpResponse.body[0]).to.have.property('name')
      expect(chaiHttpResponse.body[0]).to.have.property('totalPoints')
      expect(chaiHttpResponse.body[0]).to.have.property('totalVictories')
      expect(chaiHttpResponse.body[0]).to.have.property('totalDraws')
      expect(chaiHttpResponse.body[0]).to.have.property('totalLosses')
      expect(chaiHttpResponse.body[0]).to.have.property('goalsFavor')
      expect(chaiHttpResponse.body[0]).to.have.property('goalsOwn')
      expect(chaiHttpResponse.body[0]).to.have.property('goalsBalance')
      expect(chaiHttpResponse.body[0]).to.have.property('totalGames')
      expect(chaiHttpResponse.body[0]).to.have.property('efficiency')
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  })
  describe('Verifica funcionamento do método GET em casos de sucesso', () => {
    before(async () => {
      sinon.stub(Clubs, "findAll").resolves([]);
      sinon.stub(Matchs, "findAll").resolves([]);
    })
     
    after(async () => {
      (Clubs.findAll as sinon.SinonStub).restore();
      (Matchs.findAll as sinon.SinonStub).restore();
    })
    
    it('Retorna os dados esperados ao fazer uma requisição correta', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/away');
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Clubs not found!' })
      expect(chaiHttpResponse.status).to.be.equal(404);
    });
  })
});