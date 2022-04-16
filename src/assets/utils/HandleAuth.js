export const getToken = () => {
  return sessionStorage.getItem('token');
};

export const endSession = () => {
  sessionStorage.removeItem('token');
};

