'use client';
import PropTypes from 'prop-types';

import { useState } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import axios from 'axios';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import { SECTION_COMMON_PY } from '@/utils/constant';

// @assets
import Comingsoon from '@/images/ComingSoon';
import Circles from '@/images/Circles';

/***************************  COMING SOON  ***************************/

export default function ComingSoon({ chip, primaryBtn, description }) {
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar((prev) => prev && { ...prev, open: false });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/subscribe', { email });
      console.log('response', response);
      if (response.status === 200) {
        setSnackbar({ open: true, message: response.data.message, severity: 'success' });
        setEmail('');
      } else {
        setSnackbar({ open: true, message: response.data.error, severity: 'error' });
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Subscription error: ' + error, severity: 'error' });
    }
  };

  return (
    <ContainerWrapper>
      <Stack
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          py: SECTION_COMMON_PY,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(1.2)',
            width: 1,
            zIndex: -1,
            opacity: { xs: 1, md: 0.6 },
            height: 600,
            '& svg': { width: 1, height: 1 }
          }}
        >
          <Circles />
        </Box>
        <Stack component="form" onSubmit={submitHandler} sx={{ gap: { xs: 7, md: 12 }, alignItems: 'center' }}>
          <Stack sx={{ gap: { xs: 2, sm: 3 }, alignItems: 'center' }}>
            {chip && (
              <Chip
                variant="outlined"
                label={<Typography sx={{ color: 'text.secondary' }}>{chip.chipCaption}</Typography>}
                size="small"
                sx={{ bgcolor: 'background.default', alignSelf: 'center', '& .MuiChip-label': { py: 1, px: 2 }, borderColor: 'grey.600' }}
              />
            )}
            <Comingsoon />
            <Typography variant="h6" sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: { xs: '80%', sm: '60%' } }}>
              {description}
            </Typography>
          </Stack>
          <OutlinedInput
            autoFocus
            id="name"
            name="email"
            type="email"
            value={email}
            required
            placeholder="Enter your email address"
            onChange={(e) => {
              setEmail(e.target?.value);
            }}
            endAdornment={<Button color="primary" size="small" type="submit" variant="contained" sx={{ px: 4 }} {...primaryBtn} />}
            slotProps={{ input: { 'aria-label': 'Email address' } }}
            sx={{
              bgcolor: 'background.default',
              ...theme.typography.caption2,
              maxWidth: { xs: 343, sm: 364 },
              width: 1,
              p: 0.5,
              margin: 'auto',
              whiteSpace: 'nowrap',
              '& .MuiOutlinedInput-input': {
                p: '6px 20px'
              },
              '& .MuiOutlinedInput-notchedOutline': { borderRadius: 25 }
            }}
          />
        </Stack>
      </Stack>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        TransitionComponent={Slide}
        open={snackbar?.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={snackbar?.severity} variant="filled" sx={{ width: '100%' }}>
          {snackbar?.message}
        </Alert>
      </Snackbar>
    </ContainerWrapper>
  );
}

ComingSoon.propTypes = { chip: PropTypes.object, primaryBtn: PropTypes.any, description: PropTypes.string };
