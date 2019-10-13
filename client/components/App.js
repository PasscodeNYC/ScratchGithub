import React from 'react';
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import login from '../../facebook.js';

const App = () => {

  // const handleClick = () => {
  //   fetch('/githubInitOAUTH')
  //     .then(response => console.log(response));
  // }

  // console.log("client id from env variables,", CLIENT_ID);

  const loginWithFacebook = (e) => {
    // e.preventDefault;
    login();
  }


  return (
    <div>
      <h1>log in:</h1>
      <a href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo`}>sign in with github</a>
      <br />
      <br />
      <a id="loginbtn" onClick={loginWithFacebook}>sign in with facebook</a>
    </div>
  )
}


export default App;