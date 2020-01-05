![Screenshot (15)](https://user-images.githubusercontent.com/47183919/71553432-9fbfc580-2a35-11ea-9ff0-17fbe95fe68a.png)
![Screenshot (16)](https://user-images.githubusercontent.com/47183919/71553434-a3ebe300-2a35-11ea-8981-a3cf2610e6ed.png)
![Screenshot (17)](https://user-images.githubusercontent.com/47183919/71553435-a6e6d380-2a35-11ea-87f6-5eb9f8fb1f49.png)
![Screenshot (18)](https://user-images.githubusercontent.com/47183919/71553437-acdcb480-2a35-11ea-9537-cfdf498c2017.png)


You can view a live demo over at https://scream-c9947.firebaseapp.com
To get the frontend running locally:
# Features
 * Signup and Login using firebase authentication .
 * 
# Clone this repo
npm install to install all req'd dependencies
npm start to start the local server (this project uses create-react-app)

# Tools used
  * **React** -This is front end single page application framework. This helped in creating highly decoupled application using state and props.
  * **Redux** -  Redux is a predictable state container for JavaScript apps. Redux makes it easy to manage the state of your application. 
  * **Express** - Express. js is a Node js web application server framework, which is specifically designed for building single-page, multi-page, and hybrid web applications.
  * **Firebase clouds** - Cloud Firestore is a flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud Platform.
  * **Firebase Functions** - The firebase-functions package provides an SDK for defining Cloud Functions for Firebase. Cloud Functions is a hosted, private, and scalable Node. js environment where you can run JavaScript code.
  * **Axios** - A popular, promise-based HTTP client that sports an easy-to-use API and can be used in both the browser and Node.js. 
  * **jwt-decode** - is a small browser library that helps decoding JWTs token which are Base64Url encoded .
  * **Material UI** - It is used for styling .
  * **Material UI icons** - For getting icons .
  * **Day.js** - is a minimalist JavaScript library that parses, validates, manipulates, and displays dates and times for modern browsers with a largely Moment.js-compatible API. 
  * **React-router-dom** -  This is the core package for the router. react-router-dom : It contains the DOM bindings for React Router. 
  * **Jest** - Jest is a library for testing JavaScript code.
# Making requests to the backend API
For convenience, we have a live API server running at https://us-central1-social-media-7f318.cloudfunctions.net/api for the application to make requests against. You can view the API spec here which contains all routes & responses for the server.
The source code for the backend server (available for Node, Rails and Django) can be found in the main RealWorld repo.

# Functionality overview
 * The example application is a social site (i.e. a Twitter.com clone) called "Scream". It uses a Firebase API for all requests, including authentication.  

# General functionality:

Authenticate users via JWT (login/signup pages + logout button on settings page)
* CRU* users (sign up)
* CR*D screams 
* CR** Comments on screams (no updating required)
* CR** Like screams
* CR** Unlike screams
* CRUD for User Profile details
* Uploading Image for User profile.
* Getting Notifications whenever other user likes or comment on scream. 
* GET and display lists of screams.
* Redux for storing current user details


* Home page (URL: /#/ )
   * List of scream pulled from firebase cloud
* Sign in/Sign up pages (URL: /#/login, /#/signup )
   * Use JWT (store the token in localStorage)
   
* Scream page (URL: /#/user/handle/scream/screamId ).
  * likes count and comment count
  * Delete scream button (only shown to scream's author).
  * Comments section at bottom of scream.
  * Like/Unlike scream at the bottom.

* Profile page (URL: /#/@user/handle)
   * Show basic user info
   * List of screams posted by user
