'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getRadiusStyles } from '@/utils/getRadiusStyles';

// @mui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import Grid from '@mui/material/Grid2';
import { useSnackbar } from '@/components/CustomSnackbar';
import { ServicesData } from './data';
import Factory from '@/utils/Factory';
import { ServicesRoute } from './data';
import { IconArrowDown, IconArrowUp } from '@tabler/icons-react';
import { Button } from '@mui/material';
import AnalyticsBehaviorChart from '@/sections/dashboard/analytics/user-behavior/AnalyticsBehaviorChart';
import PayrollSummary from './PayrollSummary';
// @project
import MainCard from '@/components/MainCard';
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

export default function Services() {
  const theme = useTheme();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const [ServicesCards, setServicesCards] = useState([]);
  let clientListData = {};
  const getServicesList = async () => {};
  const [overviewData, setOverviewData] = useState([]);

  useEffect(() => {
    let overview = [
      {
        title: 'Active Employees',
        href: 'active-employees',
        value: '23,876',
        buttonLable: 'View Details',
        chip: {
          label: '24.5%',
          avatar: <IconArrowUp />
        }
      },
      {
        title: 'EPF',
        href: 'pending',
        value: clientListData.pending || 0,
        buttonLable: 'View Details',
        chip: {
          label: '20.5%',
          avatar: <IconArrowUp />
        }
      },
      {
        title: 'ESI',
        href: 'in_progress',
        value: clientListData.in_progress || 0,
        buttonLable: 'View Details',
        chip: {
          label: '20.5%',
          color: 'error',
          avatar: <IconArrowDown />
        }
      },
      {
        title: 'TDS',
        href: 'completed',
        value: clientListData.completed || 0,
        buttonLable: 'View Details',
        chip: {
          label: '24.5%',
          avatar: <IconArrowUp />
        }
      },
      {
        title: 'Professional Tax',
        href: 'Professional-Tax',
        value: clientListData.completed || 0,
        buttonLable: 'View Details',
        chip: {
          label: '24.5%',
          avatar: <IconArrowUp />
        }
      }
    ];
    setOverviewData(overview);
  }, []);

  const handleChange = (val) => {
    // router.push(`/payroll/${val}`);
  };
  useEffect(() => {
    getServicesList();
  }, []);

  return (
    <MainCard>
      <Stack sx={{ gap: 3 }}>
        <Stack direction="row" sx={{ alignItems: 'end', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
          <Stack sx={{ gap: 0.5 }}>
            <Typography variant="h4" sx={{ fontWeight: 400 }}>
              Current Payroll
            </Typography>
            <Typography variant="caption" sx={{ color: 'grey.700' }}>
              Dec 25th 2024
            </Typography>
          </Stack>
        </Stack>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {ServicesCards.map((card, idx) => (
            <Grid key={idx} size={{ xs: 12, sm: 6, md: 3 }}>
              <MainCard sx={{ p: 3, bgcolor: 'grey.50', boxShadow: 'none' }}>
                <Stack sx={{ gap: 3 }}>
                  <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Stack sx={{ gap: 0.25 }}>
                      <Typography variant="h5">{card.service_name}</Typography>
                      <Typography variant="subtitle1">2520</Typography>
                    </Stack>
                    <IconButton
                      onClick={() => {
                        router.push(`/visa-services/${ServicesRoute[card.service_name]}?id=${card.id}`);
                      }}
                      variant="outlined"
                      color="secondary"
                      sx={{ bgcolor: 'background.default' }}
                    >
                      <IconArrowNarrowRight size={20} />
                    </IconButton>
                  </Stack>
                </Stack>
              </MainCard>
            </Grid>
          ))}
        </Grid>
        <Grid container sx={{ borderRadius: 4, boxShadow: theme.customShadows.section, ...applyBorderWithRadius(16, theme) }}>
          {overviewData.map((item, index) => (
            <Grid key={index} size={{ xs: 6, sm: 6, md: 3 }}>
              {/* <OverviewCard {...{ ...item, cardProps: { sx: { border: 'none', borderRadius: 0, boxShadow: 'none' } } }} /> */}

              <MainCard sx={{ border: 'none', borderRadius: 0, boxShadow: 'none' }}>
                <Stack sx={{ gap: 2 }}>
                  <Stack direction="column" sx={{ gap: 1, alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant="subtitle1">{item.title}</Typography>
                    <Typography variant="h4">{item.value}</Typography>

                    <Button color="primary" onClick={() => handleChange(item.href)}>
                      {item.buttonLable}
                    </Button>
                  </Stack>
                </Stack>
              </MainCard>
            </Grid>
          ))}
        </Grid>
        <PayrollSummary />
      </Stack>
    </MainCard>
  );
}
