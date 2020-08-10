const assert = require('assert');
const sinon = require("sinon");

const {
  getLoggedUser,
  isLoggedUser,
} = require('../src/utils/user');

describe('Dado un usuario', () => {
  it('debe llamar al la funcion con el Argumento esperado', () => {
    global.localStorage = {
      getItem: () => {},
    }
    const mock = sinon.mock(global.localStorage);

    mock.expects("getItem").once().withExactArgs("tkn");

    getLoggedUser();

    mock.verify();
  });

  it('si no existe un token en localStorage debe devolver el error not_exists', () => {
    const expected = 'not_exists';
    global.localStorage = {
      getItem: () => null,
    }

    const actual = getLoggedUser();

    assert.equal(actual, expected);
  });

  it('si existe un token en localStorage inválido debe devolver el error unexpected_error', () => {
    const expected = 'unexpected_error';
    global.localStorage = {
      getItem: () => 'I am not a object',
    }

    const actual = getLoggedUser();

    assert.equal(actual, expected);
  });

  it('si existe un usuario logeado, debe devolver true', () => {
    const expected = true;
    global.localStorage = {
      getItem: () => {},
    }

    const actual = isLoggedUser();

    assert.equal(actual, expected);
  });

  it('si no existe un usuario logeado, debe devolver false', () => {
    const expected = false;
    global.localStorage = {
      getItem: () => null,
    }

    const actual = isLoggedUser();

    assert.equal(actual, expected);
  });
});