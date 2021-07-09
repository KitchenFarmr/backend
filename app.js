const express = require('express');
const exphbs = require('express-handlebars');
const fetch = require('node-fetch');
const cleaner = require('./utils');

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


app.get('/results', (req, res) => {
  const zipcode = req.query.zipcode

  const url = 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=94103';

  const get_market_details = (async () => {
    let response = await fetch(url)
    const data = await response.json()
    let { results } = data
    results = await Promise.all(results.map( async (market) => {
      // // helper module to populate more information on each market
      return await cleaner.execute( market )
    }))
    res.json(results)
  })()
})

app.listen(3000);

module.exports = app;
