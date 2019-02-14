const express = require('express');
const chalk = require('chalk');
const glob = require('glob');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '50mb'}));
app.use('/', express.static('public'));
app.set('view engine', 'ejs');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-authorization');
  next();
});

const initRoutes = (app) => {
  // including all routes
  glob('./routes/*.js', (err, routes) => {
    if (err) {
      console.log('Error occured including routes');
      return;
    }
    routes.forEach((routePath) => {
      require(routePath).routes(app); // eslint-disable-line
    });
    console.warn('No of routes file : ', routes.length);
  });
};

initRoutes(app);

app.listen(process.env.PORT || 3001, () => {
  console.log(chalk.blue('App listening on port 3001!'));
});
