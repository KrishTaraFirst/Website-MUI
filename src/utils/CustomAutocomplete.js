import React from 'react';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';

const CustomAutocomplete = ({ label, value, onChange, options, error, helperText, name, ...props }) => {
  return (
    <Autocomplete
      size="small"
      value={value}
      onChange={onChange}
      options={options}
      renderInput={(params) => <TextField {...params} label={label} error={error} helperText={helperText} fullWidth />}
      {...props}
    />
  );
};

export default CustomAutocomplete;
