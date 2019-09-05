import axios from "axios";
import { SET_DEFAULT_IMAGES } from "./types";

export const getDefaultImages = () => async dispatch => {
  const payload = await axios.get("/contest/defaultImages");
  dispatch({ 
    type: SET_DEFAULT_IMAGES,
    payload, 
  });
}

export const createContest = () => async dispatch => {
  const payload = await axios.get("/contest/create");
}