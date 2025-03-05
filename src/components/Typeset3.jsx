import PropTypes from 'prop-types';
// @mui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/***************************  COMMON - TYPESET  ***************************/

export default function Typeset({ heading, caption, stackProps, headingProps, captionProps, image }) {
  const { sx, ...rest } = stackProps || {};

  return (
    <Stack {...rest} sx={{ gap: { xs: 1, sm: 1.5 }, ...sx }}>
      <Typography variant="h2" {...headingProps} sx={{ fontSize: '40px', ...(headingProps?.sx && { ...headingProps.sx }) }}>
        {heading}
      </Typography>
      {caption && (
        <Stack direction={'row'} sx={{ gap: 1, mt: 5 }}>
          {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={image} alt="Example" width="200" height="200" />
          </Box> */}
          <Typography variant="h6" {...captionProps} sx={{ color: 'text.secondary', ...(captionProps?.sx && { ...captionProps.sx }) }}>
            {caption}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}

Typeset.propTypes = {
  heading: PropTypes.string,
  caption: PropTypes.string,
  stackProps: PropTypes.any,
  headingProps: PropTypes.any,
  captionProps: PropTypes.any
};
