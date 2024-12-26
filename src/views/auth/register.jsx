import { Fragment } from 'react';

// @next
import NextLink from 'next/link';

// @mui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
// import { AuthLogin, AuthSocial, Copyright } from '@/components/auth';
import AuthRegister from '@/sections/auth/AuthRegister';
import AuthSocial from '@/sections/auth/AuthSocial';
import Copyright from '@/sections/auth/Copyright';

import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsCard from '@/components/cards/GraphicsCard';
import ProfileGroup2 from '@/components/cards/profile-card/ProfileGroup2';
import LogoWatermark from '@/components/logo/LogoWatermark';

import { SocialTypes } from '@/enum';
import { SECTION_COMMON_PY } from '@/utils/constant';

// @assets
import Wave from '@/images/graphics/Wave';

/***************************  COUNTER CARD  ***************************/

function CounterCard({ counter, caption, defaultUnit }) {
  return (
    <Stack sx={{ gap: 1, alignItems: 'center' }}>
      <Stack direction="row" sx={{ alignItems: 'flex-end' }}>
        <Typography component="div" variant="h3">
          {counter}
        </Typography>
        {defaultUnit && (
          <Typography component="div" variant="h4" sx={{ color: 'text.secondary', mb: { sm: 0.25, md: 0 } }}>
            {defaultUnit}
          </Typography>
        )}
      </Stack>
      <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
        {caption}
      </Typography>
    </Stack>
  );
}

/***************************  COUNTER BOX  ***************************/

function CounterBox() {
  const blockDetail = [
    { counter: '90', defaultUnit: '%', caption: 'Power of AI for navigation and communication' },
    { counter: '150', defaultUnit: '+', caption: 'Showcasing the global impact and adoption' }
  ];
  return (
    <GraphicsCard sx={{ height: 1, p: { xs: 2, sm: 4, md: 5 } }}>
      <Stack sx={{ gap: 2, alignItems: 'center', height: 1, justifyContent: 'center' }}>
        {blockDetail.map((item, index) => (
          <Fragment key={index}>
            <CounterCard {...item} />
            {blockDetail.length - 1 !== index && <Wave />}
          </Fragment>
        ))}
      </Stack>
    </GraphicsCard>
  );
}

/***************************  LOGIN - 4  ***************************/

export default function Login4() {
  const reviewData = {
    avatarList: [
      '/assets/images/user/avatar1.png',
      '/assets/images/user/avatar2.png',
      '/assets/images/user/avatar3.png',
      '/assets/images/user/avatar4.png',
      '/assets/images/user/avatar5.png'
    ],
    rating: 4.5,
    totalReviews: '200+'
  };
  const blockDetail = [
    { counter: '90', defaultUnit: '%', caption: 'Power of AI for navigation and communication' },
    { counter: '150', defaultUnit: '+', caption: 'Showcasing the global impact and adoption' }
  ];
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={1.5} sx={{ ml: 12, mr: 12 }}>
        <Grid size={{ xs: 12, sm: 8 }}>
          <GraphicsCard sx={{ height: 1, p: { xs: 2, sm: 4, md: 5 } }}>
            <ProfileGroup2 {...reviewData} />
            <Typography
              variant="h1"
              sx={{
                mt: { xs: 2.5, sm: 5, md: 6 },
                maxWidth: { xs: 300, sm: 400, md: 500 },
                fontSize: '57px',
                fontWeight: 400,
                lineHeight: '1.123',
                letterSpacing: '-0.25px'
              }}
            >
              You are one step away Sign In
            </Typography>
          </GraphicsCard>
        </Grid>
        <Grid size={{ sm: 4 }} sx={{ display: { xs: 'none', sm: 'block' } }}>
          <CounterBox blockDetail={blockDetail} />
        </Grid>
        <Grid size={12}>
          <GraphicsCard sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
            <Box sx={{ position: 'relative' }}>
              <Stack sx={{ width: 1, maxWidth: 458, m: 'auto', position: 'relative', zIndex: 1 }}>
                <AuthRegister inputSx={{ bgcolor: 'grey.100', pt: 1, pb: 1, borderRadius: '16px' }} />
                <Typography sx={{ textAlign: 'center', mt: 2.5, color: 'text.secondary' }}>
                  Already have an account ?{' '}
                  <Link
                    component={NextLink}
                    underline="hover"
                    variant="subtitle1"
                    href="/login"
                    sx={{ '&:hover': { color: 'primary.dark' } }}
                    rel="noopener noreferrer"
                    aria-label="sign up"
                  >
                    Sign in
                  </Link>
                </Typography>
                {/* <Divider sx={{ my: { xs: 4, sm: 5 } }}>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary', px: 1.25 }}>
                    Continue with email
                  </Typography>
                </Divider>
                <AuthSocial type={SocialTypes.HORIZONTAL} buttonSx={{ bgcolor: 'grey.100', '&:hover': { bgcolor: 'grey.100' } }} /> */}
                <Box sx={{ mt: { xs: 3, sm: 4, md: 5 } }}>
                  <Copyright />
                </Box>
              </Stack>
              <Box
                sx={{
                  position: 'absolute',
                  top: '-30%',
                  left: { sm: '-40%', md: '-30%', lg: '-20%' },
                  display: { xs: 'none', sm: 'block' },
                  transform: 'rotate(90deg)'
                }}
              >
                <LogoWatermark />
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '-30%',
                  right: { sm: '-40%', md: '-30%', lg: '-25%' },
                  display: { xs: 'none', sm: 'block' },
                  transform: 'rotate(-90deg)'
                }}
              >
                <LogoWatermark />
              </Box>
            </Box>
          </GraphicsCard>
        </Grid>
        <Grid size={12} sx={{ display: { xs: 'block', sm: 'none' } }}>
          <CounterBox blockDetail={blockDetail} />
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}
