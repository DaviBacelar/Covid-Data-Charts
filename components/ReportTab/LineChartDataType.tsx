import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface props {
  dataType: string;
  setFiltersHandler: (key: string, value: string) => void;
}

const LineChartDataType:React.FC<props> = ({ dataType, setFiltersHandler }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setFiltersHandler('dataType', event.target.value as string);
  };

  return (
      <FormControl fullWidth>
        <InputLabel id="linechart-data-type-helper-label">Data Type</InputLabel>
        <Select
          labelId="linechart-data-type-helper-label"
          id="linechart-data-type-helper"
          value={dataType}
          label="Data Type"
          onChange={handleChange}
        >
          <MenuItem value={'confirmedCases'}>Confirmed Cases</MenuItem>
          <MenuItem value={'deathCount'}>Death count</MenuItem>
        </Select>
      </FormControl>
  );
}

export default LineChartDataType
