export const adminLogin = data => {
  return {
    type: "ADMIN_LOGIN",
    payload: data
  }
}

export const adminLogout = () => {
  return {
    type: "LOGOUT"
  }
}

export const loadUsers = users => {
  return {
    type: "GET_USERS",
    payload: users
  }
}