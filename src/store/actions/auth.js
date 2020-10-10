import axios from 'axios';
import * as actionTypes from './actionTypes';
import { HOST_URL } from '../../settings';


export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
};

export const authUpdate = (username, watchtime, username_color) => {
  return {
    type: actionTypes.AUTH_UPDATE,
    username: username,
    watchtime: watchtime,
    username_color: username_color,
  };
};

export const authSuccess = (token, username, watchtime, userID, username_color, roleID) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    username: username,
    watchtime: watchtime,
    userID: userID,
    username_color: username_color,
    roleID: roleID
  }
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
};

export const logout = () => {
  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.get(`${HOST_URL}/api/auth/logout/`, {withCredentials:true, headers: {
      "Content-Type": "application/json"
    }})
    .then(() => {
      localStorage.clear();
    });

  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.post(`${HOST_URL}/api/auth/login/`, {
      username: username,
      password: password
    }, {credentials: "include", withCredentials: true})
      .then(() => {
        const token = "true";

        axios.get(`${HOST_URL}/api/general/user/`, {withCredentials:true, headers: {
            "Content-Type": "application/json"
          }})
          .then(res => {
            localStorage.setItem('token', token);
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('watchtime', res.data.watchtime);
            localStorage.setItem('userID', res.data.id);
            localStorage.setItem('username_color', res.data.username_color);
            localStorage.setItem('roleID', res.data.role);


            const username = res.data.username;
            const watchtime = res.data.watchtime;
            const userID = res.data.id;
            const username_color = res.data.username_color;
            const roleID = res.data.role;

            dispatch(authSuccess(token, username, watchtime, userID, username_color, roleID));
          });
      })
      .catch(err => {
        dispatch(authFail(err))
      })
  }
};

export const authSignup = (username, email, password1, password2) => {
  return dispatch => {
    dispatch(authStart());
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.post(`${HOST_URL}/api/auth/signup/`, {
      username: username,
      email: email,
      password1: password1,
      password2: password2
    }, {credentials: "include", withCredentials: true})
      .then(() => {
        const token = "true";

        axios.get(`${HOST_URL}/api/general/user/`, {withCredentials:true, headers: {
            "Content-Type": "application/json"
          }})
          .then(res => {
            localStorage.setItem('token', token);
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('watchtime', res.data.watchtime);
            localStorage.setItem('userID', res.data.id);
            localStorage.setItem('username_color', res.data.username_color);
            localStorage.setItem('roleID', res.data.role);


            const username = res.data.username;
            const watchtime = res.data.watchtime;
            const userID = res.data.id;
            const username_color = res.data.username_color;
            const roleID = res.data.role;

            dispatch(authSuccess(token, username, watchtime, userID, username_color, roleID));
          });
      })
      .catch(err => {
        dispatch(authFail(err))
      })
  }
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const watchtime = localStorage.getItem('watchtime');
    const userID = localStorage.getItem('userID');
    const username_color = localStorage.getItem('username_color');
    const roleID = localStorage.getItem('roleID');

    if (token === undefined) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token, username, watchtime, userID, username_color, roleID));
    }
  }
};