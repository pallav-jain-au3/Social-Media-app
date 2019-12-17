const isEmpty = string => string.trim() === "";
const isValidEmail = email => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) {
    return true;
  } else {
    return false;
  }
};
exports.validateSignup = data => {
  let error = {};
  if (isEmpty(data.email)) {
    error.email = "Must not be empty";
  } else if (!isValidEmail(data.email)) {
    error.email = "Email must be a valid string";
  }
  if (isEmpty(data.handle)) {
    error.handle = "Must not be empty";
  }

  if (isEmpty(data.password)) {
    error.password = "Must not be empty";
  }

  if (data.password !== data.confirmPassword) {
    error.confirmPassword = "Password must match";
  }

  return {
    error: error,
    valid: Object.keys(error).length === 0 ? true : false
  };
};

exports.validateLogin = user => {
  let error = {};
  if (isEmpty(user.email)) {
    error.email = "Must not be empty.";
  }
  if (isEmpty(user.password)) {
    error.password = "Must not be empty";
  }

  return {
    error: error,
    valid: Object.keys(error).length === 0 ? true : false
  };
};

exports.userReducer = (data)=>{
  let userDetails = {}
  if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
  if (!isEmpty(data.location.trim())) userDetails.location = data.location;
  if (!isEmpty(data.website.trim()))
  {
    if (data.website.trim().substring(0, 4)!== "http"){
        userDetails.website = `http://${data.website}`
    }
    else userDetails.website = data.website;
  }
  return userDetails
}