'use client';

// @mui
import { useTheme } from '@mui/material/styles';
import Grid2 from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

//react
import { useRouter } from 'next/navigation';

// @project
import MainCard from '@/components/MainCard';

export default function OverviewCard({ month, ctc, netPay, numEmployees, benefits }) {
  const theme = useTheme();
  const router = useRouter();

  const handleChange = (val) => {
    router.push(`corporate-admin/${val}`);
  };

  return (
    <MainCard>
      <Grid2
        container
        spacing={2}
        sx={{
          borderRadius: 4
        }}
      >
        <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ borderRadius: 2, boxShadow: theme.shadows[1], height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" align="center">
                Period: {month}
              </Typography>
              <Stack direction="row" justifyContent="space-between">
                <Stack>
                  <Typography variant="h6">₹ {ctc}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    CTC
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="h6">₹ {netPay}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Net Pay
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid2>

        {/* Number of Employees Card */}
        <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: theme.shadows[1],
              backgroundColor: theme.palette.action.hover,
              height: '100%'
            }}
          >
            <CardContent>
              <Typography variant="subtitle1" align="center" gutterBottom>
                No of Employees
              </Typography>
              <Typography variant="h3" align="center">
                {numEmployees}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>

        {/* Benefits and Deductions Card */}
        <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ borderRadius: 2, boxShadow: theme.shadows[1], height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" align="center" gutterBottom>
                Benefits & Deductions
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Deductions:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Benefits: {benefits?.benefits || '-'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Taxes: {benefits?.taxes || '-'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Others: {benefits?.others || '-'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total: {benefits?.total || '-'}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </MainCard>
  );
}
