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

describe('Testa uso do endpoint /leaderboard/home', () => {

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
});