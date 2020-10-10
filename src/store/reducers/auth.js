import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  error: null,
  loading: false,
  username: null,
  watchtime: null,
  userID: null,
  username_color: null,
  roleID: null
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    error: null,
    loading: false,
    username: action.username,
    watchtime: action.watchtime,
    userID: action.userID,
    username_color: action.username_color,
    roleID: action.roleID
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    username: null,
    watchtime: null,
    userID: null,
    username_color: null,
    roleID: null
  });
};

const authUpdate = (state, action) => {
  return updateObject(state, {
    username: action.username,
    watchtime: action.watchtime,
    username_color: action.username_color
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.AUTH_UPDATE:
      return authUpdate(state, action);
    default:
      return state;
  }
};

export default reducer;