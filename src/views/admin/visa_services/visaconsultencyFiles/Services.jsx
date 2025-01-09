'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

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
// @project
import MainCard from '@/components/MainCard';

export default function Services() {
  const theme = useTheme();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const [ServicesCards, setServicesCards] = useState([]);

  const getServicesList = async () => {
    const url = '/user_management/services/';
    try {
      const { res, error } = await Factory('get', url, {});
      if (res.status_cd === 0) {
        setServicesCards(res.data);
      }
    } catch (error) {
      console.log(error);
      showSnackbar('Something went wrong. Please try again.', 'error');
    }
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
              Services
            </Typography>
            <Typography variant="caption" sx={{ color: 'grey.700' }}>
              Some text tagline regarding Services.
            </Typography>
          </Stack>
        </Stack>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {ServicesCards.map((card, idx) => (
            <Grid key={idx} size={{ xs: 12, sm: 6, md: 3 }}>
              <MainCard sx={{ p: 1.5, bgcolor: 'grey.50', boxShadow: 'none' }}>
                <Stack sx={{ gap: 3 }}>
                  <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Stack sx={{ gap: 0.25 }}>
                      <Typography variant="subtitle1">{card.service_name}</Typography>
                      <Typography variant="caption">01 June to 01 July</Typography>
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
      </Stack>
    </MainCard>
  );
}
