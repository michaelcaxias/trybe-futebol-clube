import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcryptjs from 'bcryptjs';
import chaiHttp = require('chai-http');

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
      sinon.stub(bcryptjs, "compare").resolves(true);
    })
     
    after(async () => {
      (Users.findOne as sinon.SinonStub).restore();
      (bcryptjs.compare as sinon.SinonStub).restore();
    })
    
    it('Retorna os dados esperados ao fazer uma requisição correta', async () => {
      payload = {
        email: "admin@admin.com",
        password: "secret_admin"
      }
      chaiHttpResponse = await chai.request(app).post('/login').send(payload);
      expect(chaiHttpResponse.body.user.id).to.be.equal(mockResponseLogin.user.id);
      expect(chaiHttpResponse.body.user.username).to.be.equal(mockResponseLogin.user.username);
      expect(chaiHttpResponse.body.user.role).to.be.equal(mockResponseLogin.user.role);
      expect(chaiHttpResponse.body.token).to.be.contains(mockResponseLogin.token);
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
      expect(chaiHttpResponse.status).to.be.equal(401);
    });

    it('Retorna os dados esperados ao fazer uma requisição incorreta', async () => {
      payload = { email: "admin@admin.com" }
      chaiHttpResponse = await chai.request(app).post('/login').send(payload);

      expect(chaiHttpResponse.body).to.deep.equal({ message: "All fields must be filled" });
      expect(chaiHttpResponse.status).to.be.equal(401);
    });
    it('Retorna os dados esperados ao fazer uma requisição incorreta', async () => {
      payload = { password: "secret_user" }
      chaiHttpResponse = await chai.request(app).post('/login').send(payload);

      expect(chaiHttpResponse.body).to.deep.equal({ message: "All fields must be filled" });
      expect(chaiHttpResponse.status).to.be.equal(401);
    });
  })
});

describe('Testa uso do endpoint /login/validate', () => {

  let chaiHttpResponse: Response;
  let authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY0NzcyNTQ4N30.liM1Oa_nEGRshFcjd4gz8JWPoTHXKML-dATZVOzKb2A"
  
  describe('Verifica funcionamento do método GET em casos de sucesso', () => {

    before(async () => {
      sinon.stub(Users, "findOne").resolves(userFindOneMock as Users);
    })
    
    after(async () => {
      (Users.findOne as sinon.SinonStub).restore();
    })
    
    it('Retorna os dados esperados ao fazer uma requisição correta', async () => {
      // https://github.com/visionmedia/supertest/issues/398
      chaiHttpResponse = await chai.request(app).get('/login/validate').set('Authorization', authorization)
      expect(chaiHttpResponse.body).to.be.equal('admin');
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  })

  describe('Verifica funcionamento do método GET em casos de falha', () => {
    const incorrectTokenMessage = { message: "Invalid Token" }
    
    before(async () => {
      sinon.stub(Users, "findOne").resolves(userFindOneMock as Users);
    })
    
    after(async () => {
      (Users.findOne as sinon.SinonStub).restore();
    })

    it('Retorna os dados esperados ao fazer uma requisição correta', async () => {
      // https://github.com/visionmedia/supertest/issues/398
      authorization = "bad token";
      chaiHttpResponse = await chai.request(app).get('/login/validate').set('Authorization', authorization)
      expect(chaiHttpResponse.body).to.deep.equal(incorrectTokenMessage);
      expect(chaiHttpResponse.status).to.be.equal(401);
    });
  })
});
