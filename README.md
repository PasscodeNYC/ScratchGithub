
HOW TO GET ACCESS TO ENVIRONMENT VARIABLES ON THE FRONT END:

1. SET UP PACKAGE.JSON TO INCLUDE YOUR VARIABLES IN THE RUN SCRIPTS. FOR EX:
"scripts": {
    "start": "nodemon server/server.js",
    "build": "NODE_ENV=production CLIENT_ID=e9a2f350549bfa35026b webpack",
    "dev": "NODE_ENV=development CLIENT_ID=e9a2f350549bfa35026b webpack-dev-server --open --hot & nodemon server/server.js"
  },
2. INCLUDE IN WEBPACK.CONFIG.JS:
  plugins: [
    new webpack.DefinePlugin({
      'CLIENT_ID': JSON.stringify(process.env.CLIENT_ID)
    })
  ]
3. ACCESS CLIENT ID ON FRONT END WITH -> CLIENT_ID <- NO QUOTES