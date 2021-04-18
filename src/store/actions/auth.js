import axios from "axios";
import * as actionTypes from "./actionTypes";
import { HOST_URL } from "../../settings";
import WebSocketInstance from "../../websocket";
import { fetchImages } from "./image";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
};

export const authUpdate = (username, watchTime, userID, usernameColor, roleID) => {
  return {
    type: actionTypes.AUTH_UPDATE,
    username: username,
    watchTime: watchTime,
    userID: userID,
    usernameColor: usernameColor,
    roleID: roleID
  };
};

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token
  }
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
};

export const logout = () => {
  axios.get(`${HOST_URL}/api/auth/logout/`, {
    headers: { "Content-Type": "application/json" }
  })
    .then(() => {
      if (WebSocketInstance.socketRef) {
        WebSocketInstance.disconnect();
      }
      localStorage.clear();
    });

  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const fetchUserData = () => {
  return dispatch => {
    axios.get(`${HOST_URL}/api/general/user/`, {
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        const username = res.data.username;
        const watchTime = res.data.watchtime;
        const userID = res.data.id;
        const usernameColor = res.data.username_color;
        const roleID = res.data.role;

        dispatch(authUpdate(username, watchTime, userID, usernameColor, roleID));
      })
      /* 401 here is ok, means token has expired */
      .catch(err => {
        console.log("error " + err)
        localStorage.clear();
      });
  }
};

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios.post(`${HOST_URL}/api/auth/login/`, {
      username: username,
      password: password
    }, { credentials: 'include' })
      .then(() => {
        const token = "true";
        localStorage.setItem('token', token);

        dispatch(authSuccess(token));
        dispatch(fetchUserData());
      })
      .catch(err => {
        dispatch(authFail(err))
      })
  }
};

export const authSignup = (username, email, password1, password2) => {
  return dispatch => {
    dispatch(authStart());
    axios.post(`${HOST_URL}/api/auth/signup/`, {
      username: username,
      email: email,
      password1: password1,
      password2: password2
    }, { credentials: 'include' } )
      .then(() => {
        const token = "true";
        localStorage.setItem('token', token);

        dispatch(authSuccess(token));
        dispatch(fetchUserData());
      })
      .catch(err => {
        dispatch(authFail(err))
      })
  }
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      dispatch(authSuccess(token));
      dispatch(fetchImages());
      dispatch(fetchUserData());
    }
  }
};