
const getLoggedUser = () => {
  try {
    const user = global.localStorage.getItem('user');
    if (user !== null) {
      return JSON.parse(user);
    }
    console.error('El usuario no existe.');
    return;
  } catch (error) {
    console.error('Error inesperado');
    return 'unexpected_error';
  }
};

const isLoggedUser = () => {
  try {
    return global.localStorage.getItem('tkn') !== null;
  } catch (error) {
    return false;
  }
};

const getToken = () => {
  try {
    return JSON.parse(global.localStorage.getItem('tkn'));
  } catch (error) {
    return false;
  }
};

const logoutUser = () => {
  try {
    global.localStorage.removeItem('tkn');
    global.localStorage.removeItem('user');
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getLoggedUser,
  getToken,
  isLoggedUser,
  logoutUser,
};
