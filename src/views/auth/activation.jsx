'use client';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

// @mui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import GraphicsCard from '@/components/cards/GraphicsCard';
import ContainerWrapper from '@/components/ContainerWrapper';
import GradientFab from '@/components/GradientFab';
import SvgIcon from '@/components/SvgIcon';

import { ThemeDirection } from '@/config';
import { SECTION_COMMON_PY } from '@/utils/constant';

// @assets
import Wave from '@/images/graphics/Wave';
import DrawnArrow from '@/images/graphics/DrawnArrow';

// @project
import branding from '@/branding.json';
import LogoSection from '@/components/logo';
import Logo from '@/components/logo/LogoIcon';
import { useEffect } from 'react';
import { BASE_URL } from 'constants';
import axios from '@/utils/axios';
import PageLoader from '@/components/PageLoader';

/***************************  SMALL HERO - 6  ***************************/

function HeadlineText({ activated }) {
  const logoSize = { xs: 56, sm: 68, md: 68 };
  const textSpacing = { xs: 0.5, md: 1 };
  const boxStyling = { bgcolor: 'grey.300', borderRadius: 8, py: 1, px: { xs: 1, sm: 2 } };

  return (
    <Typography variant="h1" align="center">
      <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'center', mb: textSpacing }}>
        {/* <Stack sx={{ mr: 1, ...boxStyling }}>
          <LogoSection isIcon={false} sx={{ height: '30px', width: '30px' }} />
        </Stack>*/}
        <Box component="span" sx={{ mr: 1, ...boxStyling }}>
          <Logo />
        </Box>
        {activated ? 'Your account' : 'Oops'}
      </Stack>
      <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: textSpacing }}>
        {activated ? 'has been' : 'Please try again after sometime'}
        <Box sx={{ ...boxStyling }}>{activated ? 'Activated' : ''}</Box>
      </Stack>
    </Typography>
  );
}

const data = {
  tagline: 'Optimize Your Cloud Journey',
  primaryBtn: { children: 'Get Started' },
  list: [
    { title: 'Real-time Performance Insights and more', icon: 'tabler-chart-histogram' },
    { title: 'Automated Scaling for Efficiency and performance', icon: 'tabler-settings-up' },
    { title: 'Seamless Multi-Cloud Management', icon: 'tabler-coin' }
  ]
};

// SmallHero5({ exploreBtn = data.exploreBtn, list = data.list, heading = data.heading, caption = data.caption })
export default function SmallHero6({ tagline = data.tagline, list = data.list, primaryBtn = data.primaryBtn }) {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const UID = searchParams.get('uid');
  const token = searchParams.get('token');
  const [isProcessing, setIsProcessing] = useState(true);
  const [activated, setIsActivated] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `/user_management/activate/?uid=${UID}&token=${token}`;
        const res = await axios.get(BASE_URL + url, {});
        console.log(res);
        if (res.status === 200) {
          console.log('activated');
          setIsProcessing(false);
          setIsActivated(true);
        }
      } catch (error) {
        console.log('error', error);
        setIsActivated(false);
        setIsProcessing(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {!isProcessing ? (
        <ContainerWrapper sx={{ py: { xs: 4, sm: 5, md: 6 }, m: { xs: 5, sm: 6, md: 7 } }}>
          <GraphicsCard>
            <Stack sx={{ p: { xs: 3, sm: 4 }, alignItems: 'center' }}>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 1 }}>
                {tagline}
              </Typography>
              <Wave />
              <Box sx={{ mt: { xs: 2, md: 3 } }}>
                <HeadlineText activated={activated} />
              </Box>
              {activated && (
                <Stack direction="row" sx={{ justifyContent: 'center', mt: 5, position: 'relative' }}>
                  <Box
                    component="span"
                    sx={{
                      position: 'absolute',
                      top: '-10px',
                      left: '-25px',
                      display: 'flex',
                      ...(theme.direction === ThemeDirection.RTL && { transform: 'scaleX(-1)' })
                    }}
                  >
                    <DrawnArrow />
                  </Box>
                  <Link component={NextLink} underline="none" variant="caption2" href="/login">
                    <Button size="small" variant="contained" sx={{ px: 4, borderRadius: 25 }} {...primaryBtn} />
                  </Link>
                </Stack>
              )}
            </Stack>
          </GraphicsCard>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={{ xs: 1, sm: 3 }} sx={{ justifyContent: 'center' }}>
              {list.map((item, index) => (
                <Grid key={index} size={{ xs: 12, sm: 4, md: 3 }}>
                  <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center', '& .gradient-fab': { display: 'contents' } }}>
                    <GradientFab
                      type="round"
                      icon={<SvgIcon {...(typeof item.icon === 'string' ? { name: item.icon } : { ...item.icon })} />}
                    />
                    <Stack sx={{ justifyContent: 'center' }}>
                      <Typography sx={{ color: 'text.secondary' }}>{item.title}</Typography>
                    </Stack>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>
        </ContainerWrapper>
      ) : (
        <PageLoader />
      )}
    </>
  );
}
