import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import * as UserServices from '../database/services/UserServices';
import { app } from '../app';

import { Response } from 'superagent';
import Users from '../database/models/Users';
import { userFindOneMock, mockResponseLogin } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa uso do endpoint /login', () => {

  let chaiHttpResponse: Response;
  let payload = {};
  
  describe('Verifica funcionamento do método POST em casos de sucesso', () => {
    before(async () => {
      sinon.stub(Users, "findOne").resolves(userFindOneMock as Users);
      sinon.stub(UserServices, 'getUserById').resolves({
        status: 200, message: '', data: mockResponseLogin,
      });
    })
     
    after(async () => {
      (UserServices.getUserById as sinon.SinonStub).restore();
      (Users.findOne as sinon.SinonStub).restore();
    })
    
    payload = {
      email: "admin@admin.com",
      password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAE"
    }

    it('Retorna os dados esperados ao fazer uma requisição correta', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(payload);
      expect(chaiHttpResponse.body).to.deep.equal(mockResponseLogin);
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  })

  describe('Verifica funcionamento do método POST em casos de falha', () => {

    
    before(async () => {
      sinon.stub(Users, "findOne").resolves(userFindOneMock as Users);
    })

    after(async () => {
      (Users.findOne as sinon.SinonStub).restore();
    })
    
    it('Retorna os dados esperados ao fazer uma requisição incorreta', async () => {
      payload = { email: "admin@admin.com", password: "senha" }
      chaiHttpResponse = await chai.request(app).post('/login').send(payload);

      expect(chaiHttpResponse.body).to.deep.equal({ message: "\"password\" length must be at least 7 characters long" });
      expect(chaiHttpResponse.status).to.be.equal(400);
    });

    it('Retorna os dados esperados ao fazer uma requisição incorreta', async () => {
      payload = { email: "admin@admin.com" }
      chaiHttpResponse = await chai.request(app).post('/login').send(payload);

      expect(chaiHttpResponse.body).to.deep.equal({ message: "All fields must be filled" });
      expect(chaiHttpResponse.status).to.be.equal(400);
    });
  })
});

describe('Testa uso do endpoint /login/validate', () => {

  let chaiHttpResponse: Response;
  let authorization = ""; 
  
  describe('Verifica funcionamento do método GET em casos de sucesso', () => {
    authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY0NzcyNTQ4N30.liM1Oa_nEGRshFcjd4gz8JWPoTHXKML-dATZVOzKb2A";
 
    before(async () => {
      sinon.stub(Users, "findOne").resolves(userFindOneMock as Users);
      sinon.stub(UserServices, 'getRoleByToken').resolves({ status: 200, message: "", data: "admin" });
    })
    
    after(async () => {
      (Users.findOne as sinon.SinonStub).restore();
      (UserServices.getRoleByToken as sinon.SinonStub).restore();
    })
    
    it('Retorna os dados esperados ao fazer uma requisição correta', async () => {
      // https://github.com/visionmedia/supertest/issues/398
      chaiHttpResponse = await chai.request(app).get('/login/validate').set('Authorization', authorization)
      expect(chaiHttpResponse.body).to.be.equal('admin');
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  })

  describe('Verifica funcionamento do método GET em casos de falha', () => {
    authorization = "bad token";
    const incorrectTokenMessage = { message: "Incorrect token" }

    before(async () => {
      sinon.stub(Users, "findOne").resolves(userFindOneMock as Users);
      sinon.stub(UserServices, 'getRoleByToken').resolves({ status: 401, message: "Incorrect token", data: {}});
    })
    
    after(async () => {
      (UserServices.getRoleByToken as sinon.SinonStub).restore();
      (Users.findOne as sinon.SinonStub).restore();
    })

    it('Retorna os dados esperados ao fazer uma requisição correta', async () => {
      // https://github.com/visionmedia/supertest/issues/398
      chaiHttpResponse = await chai.request(app).get('/login/validate').set('Authorization', authorization)
      expect(chaiHttpResponse.body).to.deep.equal(incorrectTokenMessage);
      expect(chaiHttpResponse.status).to.be.equal(401);
    });
  })
});
