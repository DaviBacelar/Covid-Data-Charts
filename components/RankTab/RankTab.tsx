import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import BarChartComponent from './BarChartComponent';
import BarChartDataType from './BarChartDataType';
import BarChartCountryNumber from './BarChartCountryNumber';
import { rankFiltersInterface } from '../../interfaces/rankFilters';

interface props {
  allCountries: string[]; 
  filters: rankFiltersInterface;
  countries: string[];
  values: number[];
  setFiltersHandler: (key: string, value: string) => void;
}

const RankTab:React.FC<props> = ({ allCountries, countries, values,  filters, setFiltersHandler }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <BarChartComponent 
            data={values}
            label={'Teste'}
            labels={countries}
            countrySelected={filters.country}
          />
        </Grid>
        <Grid item xs={6}>
          <BarChartDataType dataType={filters.dataType} setFiltersHandler={setFiltersHandler} />
        </Grid>
        <Grid item xs={6}>
          <BarChartCountryNumber countries={allCountries} numCountries={filters.numCountries} setFiltersHandler={setFiltersHandler} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default RankTab;
