import * as chai from 'chai';

import PORT from '../server';

const { expect } = chai;

describe('Testa uso do arquivo server.ts', () => {
  it('Verifica se a porta está correta', () => {
    expect(PORT).to.be.equal('3001');
  });
});
