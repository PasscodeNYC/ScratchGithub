import React from 'react';
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


const App = () => {

  // const handleClick = () => {
  //   fetch('/githubInitOAUTH')
  //     .then(response => console.log(response));
  // }

  console.log("client id from env variables,", CLIENT_ID);

  return (
    <div>
      <h1>log in:</h1>
      <form method="POST" action='/login'>
        <input name="username" type="text" placeholder="username"></input>
        <input name="password" type="password" placeholder="password"></input>
        <input type="submit" value="login"></input>
      </form>
      <h1>sign up:</h1>
      <form method="POST" action='/signup'>
        <input name="username" type="text" placeholder="username"></input>
        <input name="password" type="password" placeholder="password"></input>
        <input type="submit" value="sign up"></input>
      </form>
      <a href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`}>sign in with github</a>
    </div>
  )
}


export default App;