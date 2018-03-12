import createRequestTemplate from '../src/http/createRequestTemplate';
import api from '../src/http/api';

describe('Request template', () => {
  let getPOSTrequest = null;
  let getGETrequest = null;

  beforeEach(() => {
    getPOSTrequest = createRequestTemplate('POST /user/:id');
    getGETrequest = createRequestTemplate('GET /user/:id');
  });

  it('stringify', () => {
    const getUser = api({
      host: 'localhost',
    })('GET /user/:id');

    expect(
      getUser.stringify({
        id: 1,
      })
    ).toEqual('http://localhost/user/1');
  });

  it('apply POST request', () => {
    const request = getPOSTrequest({
      id: 1,
      name: 'Thor',
    });

    expect(request).toEqual({
      query: {},
      path: '/user/1',
      method: 'POST',
      body: {
        name: 'Thor',
      },
    });
  });

  it('apply GET request', () => {
    const request = getGETrequest({
      id: 1,
      name: 'Thor',
    });

    expect(request).toEqual({
      query: {
        name: 'Thor',
      },
      path: '/user/1',
      method: 'GET',
    });
  });

  it('should throw exception if not enough bound params', () => {
    expect(() => {
      getGETrequest({
        name: 'Thor',
      });
    }).toThrow();
  });
});
