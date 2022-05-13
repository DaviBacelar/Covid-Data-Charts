import type { NextApiRequest, NextApiResponse } from 'next'
import { CountryDataInterface } from '../../interfaces/CountryDataInterface';
import jsonData from '../../small-owid-covid-data.json';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ dates: string[]; values: number[]; } | unknown>
) {
  try {
    res.status(200).json(getReportData(req.query as {[key: string]: string})); 
  } catch (error) {
    res.status(500).json({ error });
  }
}

function getReportData({ country, dataType, valueType }: {[key: string]: string}) {
  const field = getField(dataType, valueType);
  const responseData = (jsonData as { [countryName: string]: CountryDataInterface[] })[country ?? 'World'];

  return processReportData(responseData, field);
}

function processReportData(data: CountryDataInterface[], field: keyof CountryDataInterface) {
  const allByDate: {
    [date: string]: number;
  } = {};

  for(const item of data) {
    allByDate[item.date] = item[field] as number ?? 0;
  }

  return {
    dates: Object.keys(allByDate),
    values: Object.values(allByDate) as number[]
  }
}

function getField(dataType: string, valueType: string): keyof CountryDataInterface {
  if(dataType === 'confirmedCases' && valueType === 'newValues') {
    return 'new_cases';
  }

  if(dataType === 'confirmedCases' && valueType === 'cumulativeMode') {
    return 'total_cases';
  }

  if(dataType === 'deathCount' && valueType === 'newValues') {
    return 'new_deaths';
  }

  if(dataType === 'deathCount' && valueType === 'cumulativeMode') {
    return 'total_deaths';
  }

  return 'new_cases';
}
