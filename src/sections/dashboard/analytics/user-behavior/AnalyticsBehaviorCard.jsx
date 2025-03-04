'use client';

// @mui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';

// @project
import BehaviorCard from '@/components/cards/BehaviorCard';
import MainCard from '@/components/MainCard';
import { getRadiusStyles } from '@/utils/getRadiusStyles';

// @assets

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

/***************************   BEHAVIOR CARD - DATA  ***************************/

/***************************   USER BEHAVIOR - CARDS  ***************************/

export default function AnalyticsBehaviorCard({ products = false, data }) {
  const theme = useTheme();
  const router = useRouter();

  const cardCommonProps = { border: 'none', borderRadius: 0, boxShadow: 'none' };

  return (
    <Grid container sx={{ borderRadius: 4, boxShadow: theme.customShadows.section, ...applyBorderWithRadius(16, theme) }}>
      {data &&
        data.map((item, index) => (
          <Grid key={index} size={{ xs: 6, md: products ? 3 : 2.75 }}>
            <BehaviorCard
              products={products}
              {...{
                ...item,
                cardProps: {
                  onClick: () => {
                    router.push(item.href);
                  },
                  sx: {
                    ...cardCommonProps,
                    border: 'none',
                    borderRadius: 0,
                    boxShadow: 'none',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      bgcolor: 'grey.300'
                    },
                    minHeight: '100%'
                  }
                }
              }}
            />
          </Grid>
        ))}
      {!products && (
        <Grid size={{ xs: 6, md: 3.75 }}>
          <MainCard sx={{ ...cardCommonProps, height: 1, display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              You have increased your net income by{' '}
              <Typography
                component="span"
                variant="inherit"
                sx={{ color: 'success.main', ...theme.applyStyles('dark', { color: 'success.light' }) }}
              >
                6.2%
              </Typography>{' '}
              this month and decreased your expensed by{' '}
              <Typography
                component="span"
                variant="inherit"
                sx={{ color: 'error.main', ...theme.applyStyles('dark', { color: 'error.light' }) }}
              >
                3.2%
              </Typography>
            </Typography>
          </MainCard>
        </Grid>
      )}
    </Grid>
  );
}
