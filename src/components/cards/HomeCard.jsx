import PropTypes from 'prop-types';
// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

// @project

/***************************  PRESENTATION CARD  ***************************/

export default function HomeCard({ title, tagline, CustomElement, children }) {
  return (
    <Box>
      <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
        <Stack direction={'column'} sx={{ gap: 0, mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 400 }}>
            {title}
          </Typography>
          <Typography variant="caption" sx={{ color: 'grey.700' }}>
            {tagline}
          </Typography>
        </Stack>
        {CustomElement && <CustomElement />}
      </Stack>
      {children}
    </Box>
  );
}

HomeCard.propTypes = { title: PropTypes.string, children: PropTypes.any };
