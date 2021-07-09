/* eslint-disable no-param-reassign, max-len */
const fetch = require('node-fetch');

// uses the UDSA API to gather and return more information on each market queried
const apiCall = async (market, id) => {
  /*
    uses the USDA API to gather and return more information
    on each farmers market queried.
  */
  const response = await fetch(`https://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=${id}`);
  const result = await response.json();
  const { marketdetails } = result;
  const fullMarketDetails = Object.assign(market, marketdetails);
  return fullMarketDetails;
};

const splitMarketname = (market) => {
  market.distance_from_zip = market.marketname.substr(0, market.marketname.indexOf(' '));
  market.marketname = market.marketname.substr(market.marketname.indexOf(' ') + 1);
  return market;
};

const splitAddress = (market) => {
  [market.street, market.city, market.state, market.zipcode] = market.Address.split(', ');
  delete market.Address;
  return market;
};

const splitProducts = (market) => {
  market.Products = market.Products.split('; ');
  return market;
};

const splitSchedule = (market) => {
  [market.yearly_schedule, market.weekly_schedule] = [market.Schedule.slice(0, 24), market.Schedule.slice(25, 45)];
  delete market.Schedule;
  return market;
};

module.exports = {
  async execute(market) {
    const { id } = market;

    // api call
    market = await apiCall(market, id);

    // split marketname
    splitMarketname(market);
    // split address
    splitAddress(market);
    // split products
    splitProducts(market);
    // split schedule
    splitSchedule(market);
    // return results
    return market;
  },
};
