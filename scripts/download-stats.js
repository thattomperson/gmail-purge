const https = require('https');

const qs = {
  entity: 'event',
  entity_id: 'JUK5OTAF',
  aggregates: 'conversions,unique_conversions',
};

const url = new URL('https://api.usefathom.com/v1/aggregations');
Object.keys(qs).forEach((key) => url.searchParams.set(key, qs[key]));

https.get(
  url,
  {
    headers: {
      Authorization:
        'Bearer 1125899926000058|slKDFkXlqI8geLZxpHybzse9FXmriPO1ZmmnL2Ne',
    },
  },
  function (res) {
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  },
);
