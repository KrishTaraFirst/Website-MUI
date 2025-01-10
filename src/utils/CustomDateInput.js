import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';

const CustomDatePicker = ({
  label,
  value,
  onChange,
  error,
  helperText,
  width = '100%', // Default width is 100% if not provided
  size = 'small', // Default size is "small"
  onBlur,
  ...params
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur} // Triggering onBlur from Formik here
        renderInput={(props) => (
          <TextField
            {...props}
            error={error}
            helperText={helperText}
            size={size} // Ensure the size is passed to the TextField
            sx={{ width }} // Apply the width using the sx prop
          />
        )}
        {...params}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
