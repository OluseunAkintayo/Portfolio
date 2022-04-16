export const adminLogin = data => {
  return {
    type: "ADMIN_LOGIN",
    payload: data
  }
}

export const loadUsers = users => {
  return {
    type: "GET_USERS",
    payload: users
  }
}