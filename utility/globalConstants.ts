import { ReportsFiltersInterface } from '../interfaces/ReportsFiltersInterface';
import { ReportDataInterface } from '../interfaces/ReportDataInterface';
import { RankFiltersInterface } from '../interfaces/RankFiltersInterface';
import { RankDataInterface } from '../interfaces/RankDataInterface';

export const DEFAULT_REPORT_FILTERS: ReportsFiltersInterface = {
  country: 'World',
  dataType: 'confirmedCases',
  valueType: 'newValues'
};

export const DEFAULT_RANK_FILTERS: RankFiltersInterface = {
  dataType: 'confirmedCases',
  numCountries: '10'
};

export const DEFAULT_REPORT_DATA: ReportDataInterface = {
  dates: [],
  values: []
};

export const DEFAULT_RANK_DATA: RankDataInterface = {
  countries: [],
  values: []
};
