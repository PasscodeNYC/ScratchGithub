import React from 'react';
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


const App = () => {

  // const handleClick = () => {
  //   fetch('/githubInitOAUTH')
  //     .then(response => console.log(response));
  // }

  // console.log("client id from env variables,", CLIENT_ID);

  return (
    <div>
      <h1>log in:</h1>
      <a href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo`}>sign in with github</a>
    </div>
  )
}


export default App;