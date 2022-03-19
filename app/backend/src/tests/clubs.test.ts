import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';


import { clubsGetMock } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa uso do endpoint /clubs', () => {

  let chaiHttpResponse: Response;
  
  describe('Verifica funcionamento do método GET em casos de sucesso', () => {
    it('Retorna os dados esperados ao fazer uma requisição correta', async () => {
      chaiHttpResponse = await chai.request(app).get('/clubs');
      expect(chaiHttpResponse.body).to.be.equal(clubsGetMock);
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  })
});

describe('Testa uso do endpoint /clubs/:id', () => {

  let chaiHttpResponse: Response;
  
  describe('Verifica funcionamento do método GET em casos de sucesso', () => {
    it('Retorna os dados esperados ao fazer uma requisição correta', async () => {
      chaiHttpResponse = await chai.request(app).get('/clubs/1');
      expect(chaiHttpResponse.body).to.be.equal(clubsGetMock[0]);
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  })
});
