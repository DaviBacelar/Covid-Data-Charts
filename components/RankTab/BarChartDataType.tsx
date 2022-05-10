import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface props {
  dataType: string;
  setFiltersHandler: (key: string, value: string) => void;
}

const BarChartDataType:React.FC<props> = ({ dataType, setFiltersHandler }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setFiltersHandler('dataType', event.target.value as string);
  };

  return (
      <FormControl fullWidth>
        <InputLabel id="barchart-data-type-helper-label">Data Type</InputLabel>
        <Select
          labelId="barchart-data-type-helper-label"
          id="barchart-data-type-helper"
          value={dataType}
          label="Data Type"
          onChange={handleChange}
        >
          <MenuItem value={'confirmedCases'}>Total Confirmed Cases</MenuItem>
          <MenuItem value={'deathCount'}>Total Death count</MenuItem>
        </Select>
      </FormControl>
  );
}

export default BarChartDataType;
