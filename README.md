Required packages:
npm install superagent
npm install dotenv

HOW TO GET ACCESS TO ENVIRONMENT VARIABLES ON THE FRONT END:

1. SET UP PACKAGE.JSON TO INCLUDE YOUR VARIABLES IN THE RUN SCRIPTS. FOR EX:
"scripts": {
    "start": "nodemon server/server.js",
    "build": "NODE_ENV=production CLIENT_ID=e9a2f350549bfa35026b webpack",
    "dev": "NODE_ENV=development CLIENT_ID=e9a2f350549bfa35026b webpack-dev-server --open --hot & nodemon server/server.js"
  },
2. INCLUDE IN WEBPACK.CONFIG.JS:
  const webpack = require('webpack');
  plugins: [
    new webpack.DefinePlugin({
      'CLIENT_ID': JSON.stringify(process.env.CLIENT_ID)
    })
  ]
3. ACCESS CLIENT ID ON FRONT END WITH -> CLIENT_ID <- NO QUOTES


`````
HOW TO GET ACCESS TO ENVIRONMENT VARIABLES ON THE BACKEND (WITH .ENV FILE)'

1. write whatever environment variables you wnat to use on your backend, in a .env file in the root of your project structure. For expample:
CLIENT_ID=12345
2. INCLUDE AT TOP LEVEL OF YOUR SERVER.JS OR COMPARABLE EXPRESS FILE:
const dotenv = require('dotenv');
dotenv.config();
3. THEN ACCESS YOUR VARIABLES USING process.env.MY_VAR