import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface props {
  valueType: string;
  setFiltersHandler: (key: string, value: string) => void;
}

const LineChartValueType: React.FC<props> = ({ valueType, setFiltersHandler }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setFiltersHandler('valueType', event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="linechart-value-type-helper-label">Value Type</InputLabel>
      <Select
        labelId="linechart-value-type-helper-label"
        id="linechart-value-type-helper"
        value={valueType}
        label="Value Type"
        onChange={handleChange}
      >
        <MenuItem value={'newValues'}>New Values</MenuItem>
        <MenuItem value={'cumulativeMode'}>Cumulative Mode</MenuItem>
      </Select>
    </FormControl>
  );
}

export default LineChartValueType;

