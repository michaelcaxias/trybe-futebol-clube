import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica rota /login', () => {

  
  let chaiHttpResponse: Response;
  
  describe('Verifica funcionamento do método POST em casos de sucesso', () => {
    const payload = {
      email: "admin@admin.com",
      password: "senha"
    }
    
    const response = {
      user: {
        id: 1,
        username: "Admin",
        role: "admin",
        email: "admin@admin.com"
      },
      token: "123.456.789"
    }

    before(async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(payload);
    })
  
    it('Retorna os dados esperados ao fazer uma requisição correta', () => {
      expect(chaiHttpResponse.body).to.be.equal(response);
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
