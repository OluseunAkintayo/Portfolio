import { combineReducers } from "redux";

const init = {
  auth: {
    isAuthorized: false,
    isAuthenticated: false,
    user: ''
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
    default:
      return state;
  }
}

const dashboard = (state=init.dash, { type, payload }) => {
  switch(type) {
    default:
      return state;
  }
}


const reducers = combineReducers({
  authorization: authorization,
  dashboard: dashboard
})

export default reducers;