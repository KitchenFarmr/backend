const fetch = require('node-fetch');

// uses the UDSA API to gather and return more information on each market queried
const api_call = async ( market, id ) => {
  /*
    uses the USDA API to gather and return more information
    on each farmers market queried.
  */
  const response = await fetch("https://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + id)
  const result = await response.json()
  const { marketdetails } = result
  market = Object.assign(market, marketdetails)
  return market
}

const split_marketname = (market) => {
  market["distance_from_zip"] = market["marketname"].substr(0,market["marketname"].indexOf(' '));
  market["marketname"] = market["marketname"].substr(market["marketname"].indexOf(' ')+1);
  return market
}

const split_address = (market) => {
  [ market["street"], market["city"], market["state"], market["zipcode"] ] = market["Address"].split(', ')
  delete market["Address"]
  return market
}

const split_products = (market) => {
  market["Products"] = market["Products"].split('; ')
  return market
}

const split_schedule = (market) => {
  [ market["yearly_schedule"], market["weekly_schedule"] ] = [market["Schedule"].slice(0, 24), market["Schedule"].slice(25, 45)]
  delete market["Schedule"]
  return market
}

module.exports = {
  async execute(market) {
    const { marketname, id } = market

    // api call
    market = await api_call( market, id )

    // split marketname
    split_marketname(market)
    // split address
    split_address(market)
    // split products
    split_products(market)
    // split schedule
    split_schedule(market)
    // return results
    console.log(market)
    return market
  }
};
