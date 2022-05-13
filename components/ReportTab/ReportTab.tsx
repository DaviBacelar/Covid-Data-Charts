import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import LineChartComponent from './LineChartComponent';
import LineChartDataType from './LineChartDataType';
import LineChartDataValue from './LineChartValueType';
import { ReportsFiltersInterface } from '../../interfaces/ReportsFiltersInterface';

interface props {
  filters: ReportsFiltersInterface;
  dates: string[];
  values: number[];
  setFiltersHandler: (key: string, value: string) => void;
}

const ReportTab:React.FC<props> = ({ dates, values, setFiltersHandler, filters }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <LineChartComponent 
            data={values}
            label={'Teste'}
            labels={dates}
          />
        </Grid>
        <Grid item xs={6}>
          <LineChartDataType setFiltersHandler={setFiltersHandler} dataType={filters.dataType} />
        </Grid>
        <Grid item xs={6}>
          <LineChartDataValue setFiltersHandler={setFiltersHandler} valueType={filters.valueType} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ReportTab;
