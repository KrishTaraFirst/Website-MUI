'use client';
import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import GetImagePath from '@/utils/GetImagePath';

/***************************  CARD - PROFILE CARD 2  ***************************/

export default function ProfileCard2({ avatar, name, role, background, sx }) {
  return (
    <Stack
      direction="row"
      sx={{
        gap: { xs: 1, sm: 1.5 },
        ...(background && { p: 1, pr: 3, borderRadius: 10, bgcolor: typeof background === 'boolean' ? 'grey.200' : background }),
        ...sx
      }}
    >
      {console.log(avatar)}
      <Avatar src={GetImagePath(avatar)} sx={{ width: 55, height: 55 }} alt="Avatar" imgProps={{ loading: 'lazy' }} />
      <Stack sx={{ gap: 0.5, justifyContent: 'center' }}>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {role}
        </Typography>
      </Stack>
    </Stack>
  );
}

ProfileCard2.propTypes = {
  avatar: PropTypes.any,
  name: PropTypes.string,
  role: PropTypes.string,
  background: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  sx: PropTypes.any
};
