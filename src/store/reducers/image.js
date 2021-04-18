import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  images: []
};

const setImages = (state, action) => {
  return updateObject(state, {
    images: action.images
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_IMAGES:
      return setImages(state, action);
    default:
      return state;
  }
};

export default reducer;