require('dotenv/config');
const https = require('https');
const fs = require('fs');
const path = require('path');

const qs = {
  entity: 'event',
  entity_id: process.env.NEXT_PUBLIC_FATHOM_DELETE_EVENT_ID,
  aggregates: 'conversions,unique_conversions',
};

const url = new URL('https://api.usefathom.com/v1/aggregations');
Object.keys(qs).forEach((key) => url.searchParams.set(key, qs[key]));

https.get(
  url,
  {
    headers: {
      Authorization: `Bearer ${process.env.FATHOM_API_KEY}`,
    },
  },
  function (res) {
    let data = '';
    res.on('data', (d) => {
      data += d;
    });

    res.on('end', () => {
      const file = path.join(__dirname, '..', 'src', 'utils', 'stats.js');

      const json = JSON.parse(data);
      const stats = json[0];

      fs.writeFileSync(
        file,
        `export const conversions = ${
          stats.conversions * 200
        };\nexport const unique_conversions = ${stats.unique_conversions};`,
      );
    });
  },
);
