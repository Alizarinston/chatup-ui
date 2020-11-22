import axios from "axios";
import * as actionTypes from "./actionTypes";
import { HOST_URL } from "../../settings";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const addMessage = message => {
  return {
    type: actionTypes.ADD_MESSAGE,
    message: message
  };
};

export const updateWatchersCount = message => {
  return {
    type: actionTypes.UPDATE_WATCHERS_COUNT,
    watchersCount: message.watchers_count
  };
};

export const setMessages = messages  => {
  return {
    type: actionTypes.SET_MESSAGES,
    messages: messages
  };
};

export const setWatchers = watchers => {
  return {
    type: actionTypes.SET_WATCHERS,
    watchers: watchers
  };
};

export const fetchMessages = (chatID) => {
  return dispatch => {
    axios.get(`${HOST_URL}/api/broadcasts/${chatID}/messages/`, {
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        dispatch(setMessages(res.data.result))
      })
      .catch(err => console.log("error " + err));
  };
};

export const fetchWatchers = (chatID) => {
  return dispatch => {
    axios.get(`${HOST_URL}/api/broadcasts/${chatID}/watchers/`, {
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        dispatch(setWatchers(res.data.result))
      })
      .catch(err => console.log("error " + err));
  };
};