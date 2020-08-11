const {
  getLoggedUser,
  getToken,
} = require('./user');

const signup = (values) => new Promise((resolve) => {
  global.fetch('http://localhost:8080/user', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(values), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      switch (response.status) {
        case 204:
          return resolve('ok');
        case 400:
          return resolve('bad');
        case 409:
          return resolve('conflict');
        default:
          return resolve('default');
      }
    })
    .catch((e) => {
      console.error(e);
      return resolve('error');
    });
});

const getUser = () => new Promise((resolve) => {
  const tkn = global.localStorage.getItem('tkn');

  try {
    global.fetch(`http://localhost:8080/user`, {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        Authorization: JSON.parse(tkn).token,
      },
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            return response;
          case 404:
            return resolve('not_found');
          case 500:
          default:
            return resolve('unexpected');
        }
      })
      .then((response) => response.json())
      .then((user) => {
        global.localStorage.setItem('user', JSON.stringify(user));
        return resolve(user);
      })
      .catch(() => resolve('unexpected'));
  } catch (error) {
    global.localStorage.removeItem('tkn');
    resolve('unexpected');
  }
});

const signin = (values) => new Promise((resolve) => {
  global.fetch('http://localhost:8080/user/login', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(values), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      switch (response.status) {
        case 200:
          return response;
        case 400:
          return resolve('bad');
        case 404:
          resolve('not_exists');
          break;
        default:
          return resolve('default');
      }
    })
    .then((response) => response.json())
    .then((auth) => {
      global.localStorage.setItem('tkn', JSON.stringify(auth));
      return getUser();
    })
    .then((user) => {
      if (user) {
        return resolve('ok');
      }
      return resolve('default');
    })
    .catch((e) => {
      console.error(e);
      return resolve('error');
    });
});

const getAllMeetups = () => new Promise((resolve) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const user = getLoggedUser();

  if (user && user.type === 'admin') {
    const auth = getToken();
    headers.Authorization = auth.token;
  }

  global.fetch('http://localhost:8080/meetup/all', {
    method: 'GET', // or 'PUT'
    headers
  })
    .then((response) => response.json())
    .then((meetups) => {
      if (Array.isArray(meetups)) {
        return resolve(meetups);
      }
      return resolve([]);
    })
    .catch(() => resolve([]));
});

const joinMeetup = (id) => new Promise((resolve) => {
  const tkn = global.localStorage.getItem('tkn');

  try {
    global.fetch(`http://localhost:8080/meetup/join/${id}`, {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        Authorization: JSON.parse(tkn).token,
      },
    })
      .then((response) => {
        switch (response.status) {
          case 204:
            return resolve('ok');
          case 500:
          default:
            return resolve('unexpected');
        }
      })
      .then(() => getUser())
      .catch(() => resolve('unexpected'));
  } catch (error) {
    global.localStorage.removeItem('tkn');
    resolve('unexpected');
  }
});

const getWeatherByDate = (date) => new Promise((resolve) => {
  try {
    global.fetch(`http://localhost:8080/weather/${date}`, {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            return response;
          case 500:
          default:
            return resolve('unexpected');
        }
      })
      .then((response) => response.json())
      .then((weather) => {
        console.log("weather", weather);
        return resolve(weather);
      })
      .catch(() => resolve('unexpected'));
  } catch (error) {
    global.localStorage.removeItem('tkn');
    resolve('unexpected');
  }
});

module.exports = {
  getAllMeetups,
  getUser,
  getWeatherByDate,
  joinMeetup,
  signin,
  signup,
};
