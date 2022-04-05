const root = JSON.parse(localStorage.getItem('persist:root')).auth;
const token = JSON.parse(root).session.token;
export const getToken = () => {
  return token;
};

export const endSession = () => {
  sessionStorage.removeItem('token');
};
