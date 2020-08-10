const signup = (values) => {
  return new Promise((resolve) => {
    fetch("http://localhost:8080/user", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(values), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("registrado", response);
        switch (response.status) {
          case 200:
            return resolve("ok");
          case 400:
            return resolve("bad");
          case 409:
            return resolve("conflict");
          default:
            return resolve("default");
        }
      })
      .catch((e) => {
        console.error(e);
        return resolve("error");
      });
  });
};

const signin = (values) => {
  return new Promise((resolve) => {
    fetch("http://localhost:8080/login", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(values), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            resolve("ok");
            return response;
          case 400:
            resolve("bad");
            break;
          case 404:
            resolve("not_exists");
            break;
          default:
            resolve("default");
        }
      })
      .then((response) => response.json())
      .then((auth) => localStorage.setItem("tkn", JSON.stringify(auth)))
      .catch((e) => {
        console.error(e);
        return resolve("error");
      });
  });
};

const getAllMeetups = () => {
  return new Promise((resolve) => {
    fetch("http://localhost:8080/meetup/all", {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((meetups) => {
        if (Array.isArray(meetups)) {
          return resolve(meetups);
        }
        return resolve([]);
      })
      .catch((e) => {
        return resolve([]);
      });
  });
};

module.exports = {
  getAllMeetups,
  signin,
  signup,
}