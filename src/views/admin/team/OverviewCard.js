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

// @assets
import { IconArrowDown, IconArrowUp } from '@tabler/icons-react';
import { Button } from '@mui/material';

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

/***************************   OVERVIEW CARD -DATA  ***************************/

/***************************   OVERVIEW - CARDS  ***************************/

export default function OverviewCard({ clientListData }) {
  const theme = useTheme();
  const router = useRouter();
  const chipDefaultProps = { color: 'success', variant: 'text', size: 'small' };
  const [overviewData, setOverviewData] = useState([]);

  useEffect(() => {
    let overview = [
      {
        title: 'Your Businesses',
        href: 'business',
        value: '23,876',
        compare: 'Tagline content',
        buttonLable: 'View',
        size: 3.5,
        chip: {
          label: '24.5%',
          avatar: <IconArrowUp />
        }
      },
      {
        title: 'Total Users',
        href: 'pending',
        value: clientListData.pending || 0,
        size: 3.5,
        compare: 'Tagline content',
        data: clientListData.in_progress_data || [],
        buttonLable: 'View',
        chip: {
          label: '20.5%',
          avatar: <IconArrowUp />
        }
      },
      {
        title: 'New Users',
        href: '#',
        value: clientListData.pending || 0,
        size: 5,
        compare: 'Tagline content',
        data: clientListData.in_progress_data || [],
        buttonLable: 'View',
        chip: {
          label: '20.5%',
          avatar: <IconArrowUp />
        }
      }
    ];
    setOverviewData([...overview]);
  }, [clientListData]);

  const handleChange = (val) => {
    router.push(`corporate-admin//${val}`);
  };

  return (
    <Grid container sx={{ borderRadius: 4, boxShadow: theme.customShadows.section, ...applyBorderWithRadius(16, theme) }}>
      {overviewData.map((item, index) => (
        <Grid key={index} size={{ xs: 6, sm: 6, md: item.size }}>
          <MainCard sx={{ border: 'none', borderRadius: 0, boxShadow: 'none' }}>
            <Stack sx={{ gap: 2 }}>
              <Stack direction="row" sx={{ gap: 1, alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <Typography variant="subtitle1">{item.title}</Typography>
                <Button color="primary" variant="text" onClick={() => handleChange(item.href)}>
                  {item.buttonLable}
                </Button>
              </Stack>
              <Stack sx={{ gap: 0.5 }}>
                <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                  <Typography variant="h4">{item.value}</Typography>
                  {/* <Chip {...{ ...chipDefaultProps, ...item.chip }} /> */}
                </Stack>
                <Typography variant="caption" color="grey.700">
                  {item.compare}
                </Typography>
              </Stack>
            </Stack>
          </MainCard>
        </Grid>
      ))}
    </Grid>
  );
}
