import { combineReducers } from "redux";

const init = {
  auth: {
    isAuthorized: false,
    isAuthenticated: false,
    session: {}
  },
  
  dash: {
    users: [],
    user: {},
    items: [],
    item: {},
    reports: []
  }
}

const authorization = (state=init.auth, { type, payload }) => {
  switch(type) {
    case "ADMIN_LOGIN":
      return { ...state, session: payload, isAuthorized: true, isAuthenticated: true }
    case "LOGOUT":
      return { ...state, session: {}, isAuthorized: false, isAuthenticated: false }
    default:
      return state;
  }
}

const dashboard = (state=init.dash, { type, payload }) => {
  switch(type) {
    case "GET_USERS":
      return { ...state, users: payload }
    default:
      return state;
  }
}


const reducers = combineReducers({
  auth: authorization,
  dashboard: dashboard
})

export default reducers;