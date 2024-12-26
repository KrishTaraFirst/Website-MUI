'use client';
import PropTypes from 'prop-types';

// @next
import NextLink from 'next/link';

// @mui
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Slider from 'react-slick';
import LogoIcon from '@/components/logo/LogoIcon';
import ButtonBase from '@mui/material/ButtonBase';
import { useTheme } from '@mui/material/styles';

// @project
import AuthLogin from '@/sections/auth/AuthLogin';
import AuthSocial from '@/sections/auth/AuthSocial';
import Copyright from '@/sections/auth/Copyright';

import { SECTION_COMMON_PY } from '@/utils/constant';
import { SocialTypes } from '@/enum';

import ContainerWrapper from '@/components/ContainerWrapper';
import ProfileCard3 from '@/components/cards/profile-card/ProfileCard3';
import LogoMain from '@/components/logo/LogoMain';
import Rating from '@/components/Rating';
import Typeset from '@/components/Typeset';
import { generateFocusStyle } from '@/utils/generateFocusStyle';
import { position } from 'stylis';

/***************************  AUTH - LOGIN  ***************************/

export default function Login() {
  const theme = useTheme();
  const heading = 'Sign In';

  const caption = 'Start your 30-day free trial';
  const testimonials = [
    {
      review: "It's become my go-to tool for quick and precise information processing. Highly recommended!",
      ratings: 4,
      profile: {
        avatar: '/assets/images/user/avatar2.png',
        name: 'Sydnie La',
        role: 'Direct Optimization Executive'
      }
    }
  ];

  const boxRadius = { sm: 32, md: 40 };
  const boxSpacing = { sm: 4, md: 7 };

  const settings = {
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    swipeToSlide: true,
    initialSlide: 0
  };

  const slickStyle = {
    position: 'unset',
    bgcolor: 'grey.50',
    px: { sm: 3, md: 4 },
    py: 4,
    borderRadius: 6,
    '& .slick-slider': { mb: { sm: 4.5 } },
    '& .slick-track': { display: 'flex' },
    '& .slick-slide': { height: 'auto', ' > div': { height: 1, px: 0.75 } },
    '& .slick-dots li': { width: 12, height: 12, mx: 0.5 },
    '& .slick-dots li button': { width: 12, height: 12, p: 0 },
    '& .slick-dots li button:before': { fontSize: 14, width: 12, height: 12, color: 'primary.main' },
    '& .slick-dots li.slick-active button:before': { color: 'primary.main', opacity: 1 }
  };

  return (
    <Box sx={{ position: 'relative', height: { xs: 1, sm: '100vh' } }}>
      <Grid container sx={{ display: { xs: 'none', sm: 'block' }, position: 'absolute', zIndex: -1, height: 1, width: 1 }}>
        <Grid size={{ sm: 6 }} sx={{ height: 1 }}>
          <Box sx={{ bgcolor: 'grey.100', height: 1, borderBottomRightRadius: boxRadius, borderTopRightRadius: boxRadius }} />
        </Grid>
      </Grid>
      <ContainerWrapper sx={{ py: SECTION_COMMON_PY, height: 1 }}>
        <Grid container sx={{ height: 1 }}>
          <Grid size={{ sm: 6 }} sx={{ paddingLeft: 10, display: { xs: 'none', sm: 'block' } }}>
            <Stack sx={{ height: 1, justifyContent: 'space-between', px: boxSpacing }}>
              <NextLink href={'/'} passHref legacyBehavior>
                <ButtonBase
                  align="left"
                  disableRipple
                  sx={{ '&:focus-visible': generateFocusStyle(theme.palette.primary.main), justifyContent: 'left' }}
                  aria-label="logo"
                >
                  <LogoIcon />
                  <Typography variant="h1" color="primary">
                    &nbsp;Tara
                  </Typography>
                </ButtonBase>
              </NextLink>
              <Box sx={{ ...slickStyle }}>
                {/* <Slider {...settings}>
                  {testimonials.map((item, index) => ( */}
                <Stack key={'index'} sx={{ alignItems: 'center' }}>
                  <Rating rate={testimonials[0].ratings} sx={{ justifyContent: 'center' }} />
                  <Typography variant="h3" align="center" sx={{ mt: 2, mb: 5 }}>
                    {testimonials[0].review}
                  </Typography>
                  <ProfileCard3 {...testimonials[0].profile} />
                </Stack>
                {/* ))} */}
                {/* </Slider> */}
              </Box>
              <Copyright />
            </Stack>
          </Grid>
          <Grid size={{ sm: 6 }} sx={{ width: 1 }}>
            <Stack
              sx={{
                height: { xs: 'calc(100vh - 64px)', sm: 1 },
                justifyContent: { xs: 'space-between', sm: 'center' },
                alignItems: { xs: 'center', sm: 'start' },
                px: boxSpacing
              }}
            >
              <Box sx={{ width: 1 }}>
                <Typeset
                  {...{ heading, caption }}
                  stackProps={{ sx: { gap: 1, alignItems: { xs: 'center', sm: 'start' } } }}
                  captionProps={{ variant: 'body1' }}
                />
                <Box sx={{ width: 1, maxWidth: { sm: 458 }, mt: { xs: 4, sm: 6 } }}>
                  <AuthLogin inputSx={{ bgcolor: 'background.paper' }} />
                  <Typography sx={{ textAlign: 'center', mt: 2.5, color: 'text.secondary' }}>
                    Don’t have an account?{' '}
                    <Link
                      component={NextLink}
                      underline="hover"
                      variant="subtitle1"
                      href="/register"
                      sx={{ '&:hover': { color: 'primary.dark' } }}
                      rel="noopener noreferrer"
                      aria-label="sign-up"
                    >
                      Sign Up
                    </Link>
                  </Typography>
                  <Divider sx={{ my: { xs: 4, sm: 5 } }}>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary', px: 1.25 }}>
                      Continue with email
                    </Typography>
                  </Divider>
                  <AuthSocial type={SocialTypes.HORIZONTAL} />
                </Box>
              </Box>
              <Box sx={{ mt: 4, display: { sm: 'none' } }}>
                <Copyright />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </ContainerWrapper>
    </Box>
  );
}

// // @next
// import NextLink from 'next/link';

// // @mui
// import Divider from '@mui/material/Divider';
// import Link from '@mui/material/Link';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

// // @project
// import AuthLogin from '@/sections/auth/AuthLogin';
// import AuthSocial from '@/sections/auth/AuthSocial';
// import Copyright from '@/sections/auth/Copyright';

// /***************************  AUTH - LOGIN  ***************************/

// export default function Login() {
//   return (
//     <Stack sx={{ height: 1, alignItems: 'center', justifyContent: 'space-between', gap: 3 }}>
//       <Box sx={{ width: 1, maxWidth: 458 }}>
//         <Stack sx={{ gap: { xs: 1, sm: 1.5 }, textAlign: 'center', mb: { xs: 3, sm: 8 } }}>
//           <Typography variant="h1">Sign In</Typography>
//           <Typography variant="body1" color="text.secondary">
//             Welcome back! Select the method of login.
//           </Typography>
//         </Stack>

//         {/* Social login buttons */}
//         <AuthSocial />

//         <Divider sx={{ my: { xs: 4, sm: 5 } }}>
//           <Typography variant="body2" color="text.secondary">
//             or continue with email
//           </Typography>
//         </Divider>

//         {/* Login form */}
//         <AuthLogin />

//         <Typography variant="body2" color="text.secondary" sx={{ mt: { xs: 2, sm: 3 } }}>
//           Don’t have an account?{' '}
//           <Link component={NextLink} underline="hover" variant="subtitle2" href="/register" sx={{ '&:hover': { color: 'primary.dark' } }}>
//             Sign Up
//           </Link>
//         </Typography>
//       </Box>

//       {/* Copyright section*/}
//       <Copyright />
//     </Stack>
//   );
// }
