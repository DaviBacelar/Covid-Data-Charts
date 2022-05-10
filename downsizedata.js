const fs = require('fs');
const data = require('./owid-covid-data.json');

let usefullData = {};

for(const country of Object.values(data)) {
  usefullData = {
    ...usefullData,
    [country.location]: country.data.map(({ date, total_cases, new_cases, total_deaths, new_deaths }) => {
      return {
        date,
        total_cases,
        new_cases,
        total_deaths,
        new_deaths
      };
    })
  };
}

fs.writeFile('small-owid-covid-data.json', JSON.stringify(usefullData), 'utf8', () => {
  console.log('done');
});
