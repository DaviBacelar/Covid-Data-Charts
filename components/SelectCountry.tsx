import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface props {
  country: string;
  countries: string[];
  setFiltersHandler: (key: string, value: string) => void;
}

const SelectCountry:React.FC<props> = ({ country, countries, setFiltersHandler }) => {
  const [selectedCountry, setSelectedCountry] = useState(country);

  useEffect(() => {
    const timer = setTimeout(() => {
      if(Array.isArray(countries) && countries.includes(selectedCountry)) {
        setFiltersHandler('country', selectedCountry);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedCountry]);

  return (
    <Autocomplete
      disablePortal
      value={selectedCountry}
      options={countries}
      sx={{ width: '100%' }}
      onInputChange={(event, newInputValue) => {
        setSelectedCountry(newInputValue);
      }}
      renderInput={(params) => <TextField {...params} label="County" />}
    /> 
  )
}

export default SelectCountry;
