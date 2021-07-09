/* eslint-disable no-return-await */

const express = require('express');
const fetch = require('node-fetch');
const cleaner = require('./utils');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.get('/results/:zipcode', (req, res) => {
  const { zipcode } = req.params;
  const url = `http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=${zipcode}`;
  const getMarketDetails = async () => {
    const response = await fetch(url);
    const data = await response.json();
    let { results } = data;
    results = await Promise.all(results.map(async (market) => await cleaner.execute(market)));
    return res.json(results);
  };
  return getMarketDetails();
});

app.listen(5000);

module.exports = app;
