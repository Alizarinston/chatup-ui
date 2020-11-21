import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  messages: [],
  watchers: null
};

const addMessage = (state, action) => {
  return updateObject(state, {
    messages: [...state.messages, action.message]
  });
};

const updateWatchersCount = (state, action) => {
  return updateObject(state, {
    watchers: action.watchers
  });
};

const setMessages = (state, action) => {
  return updateObject(state, {
    messages: action.messages.reverse()
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_MESSAGE:
      return addMessage(state, action);
    case actionTypes.UPDATE_WATCHERS_COUNT:
      return updateWatchersCount(state, action);
    case actionTypes.SET_MESSAGES:
      return setMessages(state, action);
    default:
      return state;
  }
};

export default reducer;