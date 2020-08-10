
const getLoggedUser = () => {
  debugger;
  try {
    const tkn = localStorage.getItem('tkn');
    if (tkn !== null) {
      return JSON.parse(tkn);
    }
    console.error('El token no existe.');
    return 'not_exists';
  } catch (error) {
    console.error('Error inesperado');
    return 'unexpected_error';
  }
};

const isLoggedUser = () => {
  try {
    return localStorage.getItem('tkn') !== null;
  } catch (error) {
    return false;
  }
};

module.exports = {
  getLoggedUser,
  isLoggedUser, 
};
