import axios from "axios";
import * as actionTypes from "./actionTypes";
import { HOST_URL } from "../../settings";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const setImages = images  => {
  return {
    type: actionTypes.SET_IMAGES,
    images: images
  };
};

export const fetchImages = () => {
  return dispatch => {
    axios.get(`${HOST_URL}/api/images/`, {
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        dispatch(setImages(res.data));
      })
      .catch(err => {
        console.log("error " + err)
      });
  }
}