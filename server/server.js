// import 'dotenv/config'; // import environmental variables
const cors = require('cors'); //enable cross site scripting
const express = require("express");
const app = express();
const path = require('path');
const request = require('superagent');
const dotenv = require('dotenv');
// const oautha = require('oautha');
dotenv.config();

app.use(cors()); // add the cors http header to every request by default - makes all routes accessible for all domains.

//extract body of incoming request stream and makes accessible on req.body
app.use(express.json()); // automatically transforms incoming body data - built on bodyParser
app.use(express.urlencoded({ extended: true })); // automatically transforms incoming body data - built on bodyParser


app.use('/build', express.static(path.join(__dirname, '../build'))); //static serve files in bundle.js or whatever is in build folder. this is what actually "connects" our backend to react.


app.get('/', (req, res) => {
  // console.log('serving');
  // oautha.dareToTryMe();
  res.sendFile(path.join(__dirname, '../index.html'));
})

//OAUTH

//GITHUB

const callbackURL = 'you define this on github';
const CLIENT_ID = 'you define this in package.json scripts';
const CLIENT_SECRET = 'you define this in package.json scripts';
const userAgent = 'you define this here';

app.get(callbackURL, (req, res) => {
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

  console.log("what is my client ID", CLIENT_ID);
  // if success, // make outgoing POST request with superagent.
  request
    .post('https://github.com/login/oauth/access_token')
    .send({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code: code })
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
          'User-Agent': userAgent
        })
        .then(result => {
          console.log("in result in 2nd oauth get request");
          console.log("response data from github: ", result.body);
          res.send(result.body);
        })
        .catch(err => console.log('error: get request failed,', err));
      // console.log('in get');

    })
    .catch(err => console.log("error: post request failed.", err.stack));

});

// FACEBOOK

app.post('/login-with-facebook', async (req, res) => {
  console.log('in post request login-with-facebook');
  const { accessToken, userID } = req.body;
  //here we would usually store accessTOken and userID in a database.
  // first we need to validate whether they are correct.
  console.log("access token", accessToken);
  console.log("userID", userID);

  const data = await request.get(`https://graph.facebook.com/v1.0/me?access_token=${accessToken}&method=get&pretty=0&sdk=joey&suppress_http_code=1`);
  console.log("what is my data?", data);

  // const json = await data.json();

  // if (json.id === userID) {
  //   //valid user
  //   console.log("valid user! json:", json);
  //   // check here if the user exists in DB, then login, else register and then login
  // } else {
  //   //impersonator!
  //   //just send a warning or ban their IP address or whatver you want to do 
  //   console.log("uh oh, looks like someone is trying to impersonate you!");
  // }

})

app.listen(3000, () => {
  console.log(`listening on port 3000`);
})