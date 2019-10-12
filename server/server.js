// import 'dotenv/config'; // import environmental variables
const cors = require('cors'); //enable cross site scripting
const express = require("express");
const app = express();
const path = require('path');
const request = require('superagent');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors()); // add the cors http header to every request by default - makes all routes accessible for all domains.

//extract body of incoming request stream and makes accessible on req.body
app.use(express.json()); // automatically transforms incoming body data - built on bodyParser
app.use(express.urlencoded({ extended: true })); // automatically transforms incoming body data - built on bodyParser


app.use('/build', express.static(path.join(__dirname, '../build'))); //static serve files in bundle.js or whatever is in build folder. this is what actually "connects" our backend to react.


app.get('/', (req, res) => {
  // console.log('serving');
  res.sendFile(path.join(__dirname, '../index.html'));
})

//OAUTH

app.get('/user/signin/callback', (req, res) => {
  console.log("yay");
  const { query } = req;
  const { code } = query;

  console.log("query", query);
  console.log('code', code);

  if (!code) {
    console.log("ERROR, no code returned.");
    return res.send({
      success: false,
      message: 'Error: no code returned.'
    })
  }

  console.log("what is my client ID", process.env.CLIENT_ID);
  // if success, // make outgoing POST request with superagent.
  request
    .post('https://github.com/login/oauth/access_token')
    .send({ client_id: process.env.CLIENT_ID, client_secret: process.env.CLIENT_SECRET, code: code })
    .set('Accept', 'application/json')
    .then(result => {
      const data = result.body; // this contains our access token
      console.log("my data back", data);
      // res.send(data); // here we would usually save the access token to a database
      const accessToken = data.access_token;
      console.log("my access token:", accessToken);
      // app.get('/user/', (req, res) => {
      //   console.log("in user!");

      request
        .get('https://api.github.com/user')
        .set({
          'Authorization': `token ${accessToken}`,
          'User-Agent': 'chriswillsflannery'
        })
        .then(result => {
          console.log("in result in 2nd oauth get request");
          console.log("response data from github: ", result.body);
          res.send(result.body);
        })
        .catch(err => console.log('error: get request failed,', err));
      console.log('in get');

    })
    .catch(err => console.log("error: post request failed.", err.stack));

});

// app.get('/user', (req, res) => {
//   request
//     .get('https://api.github.com/user')
//     .set({
//       'Authorization': `token 2716d88f661a3749f5e6f4c196894bd38f1cb0a8`,
//       'User-Agent': 'chriswillsflannery'
//     })
//     .then(result => {
//       console.log("in result in 2nd oauth get request");
//       console.log("response data from github: ", result.body);
//       res.send(result.body);
//     })
//     .catch(err => console.log('error: get request failed,', err));
//   console.log('in get');
// })


app.listen(3000, () => {
  console.log(`listening on port 3000`);
})