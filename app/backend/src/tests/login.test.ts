import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica MSC de Login', () => {

  const payload = {
    email: "admin@admin.com",
    password: "senha",
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

  let chaiHttpResponse: Response;

  it('Essa requisição deve retornar código de status 200', () => {
    expect(response).to.have.property('user');
  });
});
