import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';


import { clubsGetMock } from './mocks';
import Clubs from '../database/models/Clubs';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa uso do endpoint /clubs', () => {

  let chaiHttpResponse: Response;
  
  describe('Verifica funcionamento do método GET em casos de sucesso', () => {
    it('Retorna os dados esperados ao fazer uma requisição correta', async () => {
      chaiHttpResponse = await chai.request(app).get('/clubs');
      expect(chaiHttpResponse.body).to.deep.equal(clubsGetMock);
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  })
  describe('Verifica funcionamento do método GET em casos de erro', () => {
    before(() => {
      sinon.stub(Clubs, "findAll").resolves([]);
    })

    after(() => {
      (Clubs.findAll as sinon.SinonStub).restore();
    })

    it('Retorna um erro ao fazer uma requisição sem existir clubs no DB', async () => {
      chaiHttpResponse = await chai.request(app).get('/clubs');
      expect(chaiHttpResponse.body).to.be.equal({ message: 'Could not find any Teams' });
      expect(chaiHttpResponse.status).to.be.equal(404);
    });
  })
});

describe('Testa uso do endpoint /clubs/:id', () => {

  let chaiHttpResponse: Response;
  
  describe('Verifica funcionamento do método GET em casos de sucesso', () => {
    it('Retorna os dados esperados ao fazer uma requisição correta', async () => {
      chaiHttpResponse = await chai.request(app).get('/clubs/1');
      expect(chaiHttpResponse.body).to.deep.equal(clubsGetMock[0]);
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  })
  describe('Verifica funcionamento do método GET em casos de erro', () => {
    it('Retorna um erro ao fazer uma requisição usando um id inexistente', async () => {
      chaiHttpResponse = await chai.request(app).get('/clubs/100');
      expect(chaiHttpResponse.body).to.be.equal({ message: 'Could not find a Team with this id' });
      expect(chaiHttpResponse.status).to.be.equal(400);
    });
    it('Retorna um erro ao fazer uma requisição usando uma string no lugar de um numero', async () => {
      chaiHttpResponse = await chai.request(app).get('/clubs/naosouumnumero');
      expect(chaiHttpResponse.body).to.be.equal({ message: "\"id\" must be a number" });
      expect(chaiHttpResponse.status).to.be.equal(400);
    });
  })
});
