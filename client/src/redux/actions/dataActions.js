import {
  SET_SCREAMS,
  SET_SCREAM,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  LOADING_UI,
  POST_SCREAM,
  CLEAR_ERRORS,
  SET_ERRORS,
  STOP_LOADING,
  SUBMIT_COMMENT
} from "../types";
import axios from "axios";

export const getScreams = () => disptach => {
  disptach({
    type: LOADING_DATA
  });

  axios
    .get(
      "https://us-central1-social-media-7f318.cloudfunctions.net/api/screams"
    )
    .then(res => {
      disptach({ type: SET_SCREAMS, payload: res.data });
    })
    .catch(err => {
      disptach({
        type: SET_SCREAMS,
        payload: []
      });
    });
};

export const postScream = newScream => disptach => {
  disptach({ type: LOADING_UI });
  axios
    .post(
      "https://us-central1-social-media-7f318.cloudfunctions.net/api/screams",
      newScream
    )
    .then(res => {
      disptach({
        type: POST_SCREAM,
        payload: res.data
      });

      disptach({
        type: CLEAR_ERRORS
      });
    })
    .catch(err => {
      disptach({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const likeScream = screamId => disptach => {
  axios
    .get(
      `https://us-central1-social-media-7f318.cloudfunctions.net/api/screams/${screamId}/like`
    )
    .then(res => {
      disptach({ type: LIKE_SCREAM, payload: res.data });
    })
    .catch(err => console.log(err));
};

export const unlikeScream = screamId => disptach => {
  axios
    .get(
      `https://us-central1-social-media-7f318.cloudfunctions.net/api/screams/${screamId}/unlike`
    )
    .then(res => {
      disptach({ type: UNLIKE_SCREAM, payload: res.data });
    })
    .catch(err => console.log(err));
};

export const deleteScream = screamId => disptach => {
  console.log(screamId);
  axios
    .delete(
      `https://us-central1-social-media-7f318.cloudfunctions.net/api/screams/${screamId}`
    )
    .then(() => {
      disptach({
        type: DELETE_SCREAM,
        payload: screamId
      });
    })
    .catch(err => console.log(err));
};

export const getScream = screamId => dispatch => {
  dispatch({
    type: LOADING_UI
  });

  axios
    .get(
      `https://us-central1-social-media-7f318.cloudfunctions.net/api/screams/${screamId}`
    )
    .then(res => {
      dispatch({
        type: SET_SCREAM,
        payload: res.data
      });

      dispatch({
        type: STOP_LOADING
      });
    })
    .catch(err => console.log(err));
};

export const clearErrors = () => dispatch =>{
  dispatch({
    type:CLEAR_ERRORS
  })
}

export const submitComment = (commentData, screamId) => dispatch =>{
    axios.post(`https://us-central1-social-media-7f318.cloudfunctions.net/api/screams/${screamId}/comment`, commentData)
    .then(res => {
      dispatch({
        type:SUBMIT_COMMENT,
        payload:res.data
      })
      dispatch(clearErrors())
    })
    .catch(err => {
    dispatch({type : SET_ERRORS, 
    payload : err.response.data})
    })
}

