'use client';

// @mui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

//react
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// @project
import MainCard from '@/components/MainCard';
import { getRadiusStyles } from '@/utils/getRadiusStyles';
import AnalyticsBehaviorChart from '@/sections/dashboard/analytics/user-behavior/AnalyticsBehaviorChart';

// @assets
import { IconArrowDown, IconArrowUp } from '@tabler/icons-react';
import { Button } from '@mui/material';
import HomeCard from '@/components/cards/HomeCard';

/***************************  CARDS - BORDER WITH RADIUS  ***************************/

export function applyBorderWithRadius(radius, theme) {
  return {
    overflow: 'hidden',
    '--Grid-borderWidth': '1px',
    borderTop: 'var(--Grid-borderWidth) solid',
    borderLeft: 'var(--Grid-borderWidth) solid',
    borderColor: 'divider',
    '& > div': {
      overflow: 'hidden',
      borderRight: 'var(--Grid-borderWidth) solid',
      borderBottom: 'var(--Grid-borderWidth) solid',
      borderColor: 'divider',
      [theme.breakpoints.down('md')]: {
        '&:nth-of-type(1)': getRadiusStyles(radius, 'topLeft'),
        '&:nth-of-type(2)': getRadiusStyles(radius, 'topRight'),
        '&:nth-of-type(3)': getRadiusStyles(radius, 'bottomLeft'),
        '&:nth-of-type(4)': getRadiusStyles(radius, 'bottomRight')
      },
      [theme.breakpoints.up('md')]: {
        '&:first-of-type': getRadiusStyles(radius, 'topLeft', 'bottomLeft'),
        '&:last-of-type': getRadiusStyles(radius, 'topRight', 'bottomRight')
      }
    }
  };
}

export default function SuperAdmin({ clientListData = {} }) {
  const theme = useTheme();
  const router = useRouter();
  const chipDefaultProps = { color: 'success', variant: 'text', size: 'small' };
  const [overviewData, setOverviewData] = useState([
    {
      title: 'Corporate Entities',
      href: 'corporate-entities',
      value: '23,876',
      compare: 'Tagline content',
      buttonLable: 'Add User'
    },
    {
      title: 'Individual Users',
      href: 'individual',
      value: '93,876',
      compare: 'Tagline content',
      buttonLable: 'Add User'
    },
    {
      title: 'CA Firms',
      href: 'ca-firms',
      value: '21,376',
      compare: 'Tagline content',
      buttonLable: 'Add User'
    },
    {
      title: 'Service Providers',
      href: 'service-providers',
      value: '53,956',
      compare: 'Tagline content',
      buttonLable: 'Add User'
    }
  ]);

  //   useEffect(() => {
  //     let overview = ;
  //     setOverviewData([...overview]);
  //   }, [clientListData]);

  const handleChange = (val) => {
    router.push(`/dashboard/user/${val}`);
  };

  return (
    <HomeCard title="Quick Access" tagline="Manage your users here">
      <Grid container sx={{ mb: 2, borderRadius: 4, boxShadow: theme.customShadows.section, ...applyBorderWithRadius(16, theme) }}>
        {overviewData.map((item, index) => (
          <Grid key={index} size={{ xs: 6, sm: 6, md: 3 }}>
            {/* <OverviewCard {...{ ...item, cardProps: { sx: { border: 'none', borderRadius: 0, boxShadow: 'none' } } }} /> */}

            <MainCard sx={{ border: 'none', borderRadius: 0, boxShadow: 'none' }}>
              <Stack sx={{ gap: 2 }}>
                <Stack direction="row" sx={{ gap: 1, alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <Typography variant="subtitle1">{item.title}</Typography>
                  <Button color="primary" onClick={() => handleChange(item.href)}>
                    {/* {item.buttonLable} */}
                    View
                  </Button>
                </Stack>
                <Stack sx={{ gap: 0.5 }}>
                  <Stack direction="row" sx={{ gap: 1, alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <Stack direction="column" sx={{ gap: 0 }}>
                      <Typography variant="h4">{item.value}</Typography>
                      {/* <Chip {...{ ...chipDefaultProps, ...item.chip }} /> */}
                      <Typography variant="caption" color="grey.700">
                        {item.compare}
                      </Typography>
                    </Stack>
                    {/* <Button color="primary" onClick={() => handleChange(item.href)}>
                      View
                    </Button> */}
                  </Stack>
                </Stack>
              </Stack>
            </MainCard>
          </Grid>
        ))}
      </Grid>
      <AnalyticsBehaviorChart />
    </HomeCard>
  );
}
