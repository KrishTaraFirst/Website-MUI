import { TextField } from '@mui/material';

const CustomInput = ({
  id,
  placeholder,
  type = 'text',
  touched,
  errors,
  InputProps,
  maxWidth, // Default maxWidth
  width,
  autoComplete,
  textColor,
  multiline,
  maxRows,
  rows,
  onBlur,
  ...props
}) => {
  return (
    <TextField
      sx={{
        maxWidth, // Apply maxWidth from props
        '& .MuiInputLabel-root': {
          fontSize: '14px'
        },
        '& .MuiInputBase-input': {
          fontSize: '15px',
          color: textColor || 'inherit' // Apply text color
        }
      }}
      id={id}
      autoComplete={autoComplete}
      placeholder={placeholder}
      type={type}
      fullWidth
      variant="outlined"
      size="small"
      error={Boolean(touched && errors)} // Shows error when `touched` and `errors` are true
      helperText={touched && errors ? <span style={{ color: 'red' }}>{errors}</span> : null} // Custom red error text
      InputProps={InputProps}
      multiline={multiline} // Pass multiline prop here
      rows={rows} // Optionally set rows for default visible rows
      maxRows={maxRows}
      onBlur={onBlur}
      {...props}
    />
  );
};

export default CustomInput;
