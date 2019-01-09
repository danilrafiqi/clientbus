import jwtDecode from 'jwt-decode';

const getToken = () => {
  return localStorage.getItem('drcreative');
};

const setToken = token => {
  return localStorage.setItem('drcreative', token);
};

const removeToken = () => {
  return localStorage.removeItem('drcreative');
};

const decodeToken = (token = this.getToken()) => {
  try {
    if (token) {
      const user = jwtDecode(token);
      return user;
    }
  } catch (e) {
    return 'notvalid';
  }
};

export default { getToken, setToken, decodeToken, removeToken };
