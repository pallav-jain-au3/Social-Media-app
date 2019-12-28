import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER, 
  LOADING_DATA,
  SET_SCREAMS,
  MARK_NOTIFICATIONS_READ
} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => dispatch => {
  dispatch({
    type: LOADING_UI
  });
  axios
    .post(
      "https://us-central1-social-media-7f318.cloudfunctions.net/api/login",
      userData
    )
    .then(res => {
      setAuthorizationToken(res.data.token);
      dispatch(getUserData());
      dispatch({
        type: CLEAR_ERRORS
      });
      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
      return;
    });
};

export const signUpUser = (userData, history) => dispatch => {
  dispatch({
    type: LOADING_UI
  });
  axios
    .post(
      "https://us-central1-social-media-7f318.cloudfunctions.net/api/signup",
      userData
    )
    .then(res => {
      setAuthorizationToken(res.data.token);
      dispatch(getUserData());
      dispatch({
        type: CLEAR_ERRORS
      });

      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
      return;
    });
};

export const getUserData = () => dispatch => {
  dispatch({
    type: LOADING_USER
  });
  axios
    .get("https://us-central1-social-media-7f318.cloudfunctions.net/api/user")
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({
    type: SET_UNAUTHENTICATED
  });
};

export const uploadImage = formData => dispatch => {
  dispatch({
    type: LOADING_USER
  });
  axios
    .post(
      "https://us-central1-social-media-7f318.cloudfunctions.net/api/user/image",
      formData
    )
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

export const editUserDetails = userDetails => dispatch => {
  dispatch({
    type: LOADING_USER
  });
  axios
    .post(
      "https://us-central1-social-media-7f318.cloudfunctions.net/api/user",
      userDetails
    )
    .then(res => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

export const getUserDetails = (handle) => dispatch =>{
    dispatch({
      type :LOADING_DATA
    })

    axios.get(`https://us-central1-social-media-7f318.cloudfunctions.net/api/user/${handle}`)
    .then (res => {
      dispatch({
        type:SET_SCREAMS,
        payload:res.data.screams
      })
    })
    .catch(err =>{
      console.log(err)
      dispatch({
        type:SET_SCREAMS,
        payload:null
      })
    })


}

export const markNotificationsRead = (notificationIds) => dispatch =>{
  axios.post(`https://us-central1-social-media-7f318.cloudfunctions.net/api/notifications`, notificationIds)
  .then(() => {
      dispatch({type:MARK_NOTIFICATIONS_READ})
  })
  .catch(err => {
    console.log(err)
  })
}
const setAuthorizationToken = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
