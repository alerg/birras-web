const assert = require('assert');
const sinon = require("sinon");

const { signup } = require('../src/utils/api');

function method(status) {
  return new Promise((resolve, reject ) => {
    setTimeout(() => {
      resolve({ status });
    }, 100);
  });
}

describe('Dada una interface de acceso a la api', () => {
  beforeEach(() => {
    global.fetch = () => method(200);
  });
  afterEach(() => {
    global.fetch = () => method(200);
  });

  it('usando se llama a la funcion de registro, debe devolver ok cuando la api responde con staatusCode 200', async () => {
    const expected = 'ok';
    
    global.fetch = () => method(200);

    const actual = await signup();

    assert.equal(actual, expected);
  });

  it('usando se llama a la funcion de registro, debe devolver bad cuando la api responde con staatusCode 400', async () => {
    const expected = 'bad';
    
    global.fetch = () => method(400);

    const actual = await signup();

    assert.equal(actual, expected);
  });

  it('usando se llama a la funcion de registro, debe devolver conflict cuando la api responde con staatusCode 409', async () => {
    const expected = 'conflict';
    
    global.fetch = () => method(409);

    const actual = await signup();

    assert.equal(actual, expected);
  });

  it('usando se llama a la funcion de registro, debe devolver default cuando la api responde con staatusCode inesparado', async () => {
    const expected = 'default';
    
    global.fetch = () => method(500);

    const actual = await signup();

    assert.equal(actual, expected);
  });
/*
  it('debe llamar al la funcion con el Argumento esperado', async () => {
    global = {};
    const mock = sinon.mock(global);

    const values = { email: 'email', password: 'password'};

    mock.expects("fetch").once().withArgs({
      method: "POST", // or 'PUT'
      body: JSON.stringify(values), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      }
    });

    await signup(values);

    mock.verify();
  });*/
});
