import type { NextApiRequest, NextApiResponse } from 'next'
import { CountryDataInterface } from '../../interfaces/CountryDataInterface';
import { RankDataInterface } from '../../interfaces/RankDataInterface';
import jsonData from '../../small-owid-covid-data.json';

interface countryAndValue {
  name: string;
  value: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RankDataInterface | unknown>
) {
  try {
    res.status(200).json(getReportData(req.query as {[key: string]: string}));
  } catch(error) {
    res.status(500).json({ error })
  }
}

function getReportData({ numCountries, dataType, country }: {[key: string]: string}) {
  const field = getField(dataType);
  const dataByCountry = { ...jsonData as { [countryName: string]: CountryDataInterface[] } };
  return processReportData(dataByCountry, field, numCountries, country);
}

function processReportData(dataByCountry: { [countryName: string]: CountryDataInterface[] }, field: keyof CountryDataInterface, numCountries: string, country: string) {
  let valuesByCountryArray: {
    name: string;
    value: number;
  }[] = [];
  let resultArray = [];

  for(const countryName of Object.keys(dataByCountry)) {
    valuesByCountryArray = [...valuesByCountryArray, {
      name: countryName,
      value: dataByCountry[countryName][dataByCountry[countryName].length - 1][field] as number ?? 0
    }];
  }

  if(country) {
    resultArray = [
      ...valuesByCountryArray.filter((item: countryAndValue) => item.name.toLowerCase() === country.toLowerCase()),
      ...valuesByCountryArray.filter((item: countryAndValue) => item.name.toLowerCase() !== country.toLowerCase()).sort(sortResult)
    ];
  } else {
    resultArray = valuesByCountryArray.sort(sortResult);
  }

  resultArray = resultArray.slice(0, parseInt(numCountries));

  return {
    countries: resultArray.map((item: countryAndValue) => item.name),
    values: resultArray.map((item: countryAndValue) => item.value)
  }
}

function getField(dataType: string): keyof CountryDataInterface {
  if(dataType === 'deathCount') {
    return 'total_deaths';
  } else {
    return 'total_cases';
  }
}

function sortResult(a: countryAndValue, b: countryAndValue) {
  if (a.value > b.value) {
    return -1;
  }

  if (a.value < b.value) {
    return 1;
  }

  return 0;
}
