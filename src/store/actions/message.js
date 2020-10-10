import axios from "axios";
import * as actionTypes from "./actionTypes";
import { HOST_URL } from "../../settings";

export const addMessage = message => {
  return {
    type: actionTypes.ADD_MESSAGE,
    message: message
  };
};

export const setMessages = (username, watchtime, username_color) => {
  return {
    type: actionTypes.SET_MESSAGES,
    username: username,
    watchtime: watchtime,
    username_color: username_color,
  };
};

const getUserChatsSuccess = chats => {
  return {
    type: actionTypes.GET_CHATS_SUCCESS,
    chats: chats
  };
};

export const getUserChats = (username, token) => {
  return dispatch => {
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json"
    };
    axios
      .get(`${HOST_URL}/api/auth/?username=${username}`)
      .then(res => dispatch(getUserChatsSuccess(res.data)));
  };
};