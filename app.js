const express = require('express');
const exphbs = require('express-handlebars');
const fetch = require('node-fetch');

const app = express();

app.use(express.json());

// Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/results', (req, res) => {
  // const zipcode = req.query.zipcode

  const url = 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=94103';
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    });
});

app.listen(3000);

module.exports = app;
