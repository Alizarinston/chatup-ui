import axios from "axios";
import * as actionTypes from "./actionTypes";
import { HOST_URL } from "../../settings";

export const addMessage = message => {
  return {
    type: actionTypes.ADD_MESSAGE,
    message: message,
    author: message.author.username
  };
};

export const updateWatchersCount = message => {
  return {
    type: actionTypes.UPDATE_WATCHERS_COUNT,
    message: message.watchers_count
  };
};

export const setMessages = messages  => {
  return {
    type: actionTypes.SET_MESSAGES,
    messages: messages
  };
};

export const fetchMessages = (chatID) => {
  return dispatch => {
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.get(`${HOST_URL}/api/broadcasts/${chatID}/messages/`, {withCredentials:true, headers: {
        "Content-Type": "application/json"
      }})
      .then(res => {
        dispatch(setMessages(res.data.result))
      }).catch(err => console.log("error " + err));
  };
};