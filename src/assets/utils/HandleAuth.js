export const getToken = () => {
  return sessionStorage.getItem('sessionToken');
};

export const endSession = () => {
  sessionStorage.removeItem('usrData');
  sessionStorage.removeItem('sessionToken');
};
