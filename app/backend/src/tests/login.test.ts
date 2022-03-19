import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Users from '../database/models/Users';
import { userFindOneMock, mockResponseLogin } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica rota /login', () => {

  let chaiHttpResponse: Response;
  
  describe('Verifica funcionamento do método POST em casos de sucesso', () => {
    const payload = {
      email: "admin@admin.com",
      password: "senha"
    }

    before(async () => {
      sinon.stub(Users, "findOne").resolves(userFindOneMock as Users);
    })

    after(async () => {
      (Users.findOne as sinon.SinonStub).restore();
    })
    
    it('Retorna os dados esperados ao fazer uma requisição correta', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(payload);
      expect(chaiHttpResponse.body).to.be.equal(mockResponseLogin);
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  })

  describe('Verifica funcionamento do método POST em casos de falha', () => {
    const payload = {
      email: "admin@admin.com",
      password: "senha"
    }
    before(async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(payload);
    })
  
    it('Retorna os dados esperados ao fazer uma requisição incorreta', () => {
      // https://stackoverflow.com/questions/38497731/mocha-chai-uncaught-assertionerror-expected-to-equal-expected-actua
      expect(chaiHttpResponse.body).to.deep.equal({});
      expect(chaiHttpResponse.status).to.be.equal(404);
    });
  })
});
