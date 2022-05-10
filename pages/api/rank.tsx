import type { NextApiRequest, NextApiResponse } from 'next'
import jsonData from '../../small-owid-covid-data.json';

type Data = any;

interface countryAndValue {
  name: string;
  value: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(getReportData(req.query));
}

function getReportData({ numCountries, dataType, country }: any) {
  const field = getField(dataType);
  const responseData: any = { ...jsonData };
  return processReportData(responseData, field, numCountries, country);
}

function processReportData(data: any, field: string, numCountries: string, country: string) {
  let valuesByCountryArray: any = [];
  let resultArray = [];

  for(const countryName of Object.keys(data)) {
    valuesByCountryArray = [...valuesByCountryArray, {
      name: countryName,
      value: data[countryName][data[countryName].length - 1][field] ?? 0
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

function getField(dataType: string): string {
  if(dataType === 'confirmedCases') {
    return 'total_cases';
  }

  if(dataType === 'deathCount') {
    return 'total_deaths';
  }

  return '';
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
