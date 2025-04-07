'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getRadiusStyles } from '@/utils/getRadiusStyles';
import { months } from '@/utils/MonthsList';

// @mui
import { useTheme, alpha } from '@mui/material/styles';
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
import { Box, Button, Paper, Divider } from '@mui/material';
import PayrollSummary from './PayrollSummary';
import CustomAutocomplete from '@/utils/CustomAutocomplete';
import MainCard from '@/components/MainCard';

export default function Services({ payrollId }) {
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
          avatar: <IconArrowUp />,
          color: 'success'
        },
        icon: '👥',
        color: '#4CAF50'
      },
      {
        title: 'EPF',
        href: 'pending',
        value: clientListData.pending || 0,
        buttonLable: 'View Details',
        chip: {
          label: '20.5%',
          avatar: <IconArrowUp />,
          color: 'success'
        },
        icon: '💰',
        color: '#2196F3'
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
        },
        icon: '🏥',
        color: '#FF9800'
      },
      {
        title: 'TDS',
        href: 'completed',
        value: clientListData.completed || 0,
        buttonLable: 'View Details',
        chip: {
          label: '24.5%',
          avatar: <IconArrowUp />,
          color: 'success'
        },
        icon: '📊',
        color: '#9C27B0'
      },
      {
        title: 'Professional Tax',
        href: 'Professional-Tax',
        value: clientListData.completed || 0,
        buttonLable: 'View Details',
        chip: {
          label: '24.5%',
          avatar: <IconArrowUp />,
          color: 'success'
        },
        icon: '📝',
        color: '#F44336'
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
  const handleMonthChange = useCallback(
    (event, newValue) => {
      const monthNumber = months.indexOf(newValue) + 1;
      if (payrollId) {
        router.push(`/payroll/employee-dashboard?payrollid=${payrollId}&month=${monthNumber}`);
      }
    },
    [router]
  );

  return (
    <Stack sx={{ gap: 4 }}>
      <MainCard>
        <Stack sx={{ gap: 3 }}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
            <Stack sx={{ gap: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
                Current Payroll
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                Dec 25th 2024
              </Typography>
            </Stack>
            <Box sx={{ width: { xs: '100%', sm: 300 } }}>
              <CustomAutocomplete
                value={null}
                onChange={handleMonthChange}
                options={['Please select', ...months]}
                placeholder="Select Month"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                  }
                }}
              />
            </Box>
          </Stack>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {ServicesData.map((card, idx) => (
              <Grid key={idx} size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper
                  elevation={0}
                  sx={{
                    height: '100%', // Changed back to 100% to prevent content cutoff
                    borderRadius: 2,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: (theme) => `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
                      borderColor: 'primary.main',
                      cursor: 'pointer'
                    }
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      p: 2,
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '100px',
                        height: '100px',
                        opacity: 0.1,
                        transform: 'translate(30%, -30%) rotate(30deg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <IconArrowNarrowRight size={40} />
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1.5
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: 'primary.main',
                          mr: 2
                        }}
                      >
                        <IconArrowNarrowRight size={20} />
                      </Box>
                      <Typography
                        variant="subtitle1"
                        fontWeight="600"
                        sx={{
                          color: 'text.primary',
                          fontSize: '0.95rem',
                          mr: 4
                        }}
                      >
                        {card.title}
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 600,
                          color: 'primary.main'
                        }}
                      >
                        2520
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 1.5 }} />

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: '0.8rem',
                        lineHeight: 1.4
                      }}
                    >
                      Manage {card.title.toLowerCase()} related payroll processes and workflows
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </MainCard>

      <MainCard>
        <Grid container spacing={2}>
          {overviewData.map((item, index) => (
            <Grid key={index} xs={3} sx={{ flexGrow: 1 }}>
              <Paper
                elevation={0}
                sx={{
                  height: '100%',
                  borderRadius: 2,
                  overflow: 'hidden',
                  p: 2,
                  transition: 'all 0.3s ease',
                  border: '1px solid',
                  borderColor: 'divider',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: (theme) => `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
                    borderColor: 'primary.main'
                  }
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    p: 2.5,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '4px',
                      bgcolor: item.color || 'primary.main',
                      opacity: 0.8
                    }}
                  />

                  <Stack sx={{ gap: 1.5, position: 'relative', zIndex: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        fontSize: '0.95rem',
                        textAlign: 'center'
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        mb: 1,
                        textAlign: 'center'
                      }}
                    >
                      {item.value}
                    </Typography>

                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleChange(item.href)}
                      sx={{
                        mt: 1,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 500
                      }}
                    >
                      {item.buttonLable}
                    </Button>
                  </Stack>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </MainCard>

      <PayrollSummary />
    </Stack>
  );
}
