import type { NextApiRequest, NextApiResponse } from 'next'
import jsonData from '../../small-owid-covid-data.json';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.status(200).json(getReportData(req.query));
}

interface query {
  country?: string;
  dataType: 'confirmedCases' | 'deathCount';
  valueType: 'newValues' | 'cumulativeMode';
}

function getReportData({ country, dataType, valueType }: query | any) {
  const field = getField(dataType, valueType);
  const responseData = jsonData[country ?? 'World'];

  return processReportData(responseData, field);
}

function processReportData(data: any, field: string) {
  const allByDate: any = {};

  for(const item of data) {
    allByDate[item.date] = item[field] ?? 0;
  }

  return {
    dates: Object.keys(allByDate),
    values: Object.values(allByDate)
  }
}

function getField(dataType: string, valueType: string): string {
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
