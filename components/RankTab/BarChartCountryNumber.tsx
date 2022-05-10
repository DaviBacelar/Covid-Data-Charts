import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface props {
  countries: string[],
  numCountries: string;
  setFiltersHandler: (key: string, value: string) => void;
}

const BarChartCountryNumber:React.FC<props> = ({ countries, numCountries, setFiltersHandler }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setFiltersHandler('numCountries', event.target.value as string);
  };

  const optionsList = () => {
    if(Array.isArray(countries)) {
      return countries?.map((item, index) => <MenuItem value={`${index + 1}`} key={item}>{index + 1}</MenuItem>)
    } else {
      return [];
    }
  }

  return (
    <Box style={{ position: 'relative' }}>
      <FormControl fullWidth>
        <InputLabel id="barchart-country-number-helper-label">Number of Countries</InputLabel>
        <Select
          labelId="barchart-country-number-helper-label"
          id="barchart-country-number-helper"
          value={numCountries}
          label="Number of Countries"
          onChange={handleChange}
        >
          {optionsList()}
        </Select>
      </FormControl>
    </Box>
  );
}

export default BarChartCountryNumber;
