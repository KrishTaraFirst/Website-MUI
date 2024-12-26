'use client';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

// @mui
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TabOne from './BusinessProfile/index';
import TabTwo from './Customers/index';
import TabThree from './Goods&Services/index';
import TabFour from './InvoiceNumberFormat/index';
import Avatar from '@mui/material/Avatar';
import Factory from '@/utils/Factory';
// @assets
import { IconBolt } from '@tabler/icons-react';

/***************************  ACCOUNT  ***************************/

export default function Account() {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [activeTab, setActiveTab] = useState(0);
  const [businessDetails, setBusinessDetails] = useState({});

  const handleNext = () => {
    setActiveTab((prev) => (prev < 3 ? prev + 1 : prev));
  };
  const getBusinessDetails = async () => {
    const { res } = await Factory('get', '/invoicing/invoicing-profiles/', {});
    if (res) {
      setBusinessDetails(res.data);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <TabOne businessDetails={businessDetails} setBusinessDetails={setBusinessDetails} onNext={handleNext} />;
      case 1:
        return <TabTwo businessDetails={businessDetails} setBusinessDetails={setBusinessDetails} onNext={handleNext} />;
      case 2:
        return <TabThree businessDetails={businessDetails} setBusinessDetails={setBusinessDetails} onNext={handleNext} />;
      case 3:
        return <TabFour businessDetails={businessDetails} setBusinessDetails={setBusinessDetails} onNext={handleNext} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    getBusinessDetails();
  }, [activeTab]);
  return (
    <Grid container spacing={{ xs: 2, sm: 3 }}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            centered
            sx={{
              '& .MuiTab-root': {
                marginRight: theme.spacing(4)
              },
              '& .MuiTab-root:last-child': {
                marginRight: 0
              }
            }}
          >
            <Tab
              label={
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme.spacing(2) }}>
                  <Avatar variant="rounded" sx={{ bgcolor: 'grey.300', width: 32, height: 32 }}>
                    <IconBolt color={theme.palette.text.primary} />
                  </Avatar>
                  <Typography variant="subtitle1">Business Profile</Typography>
                </Box>
              }
            />
            <Tab
              label={
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme.spacing(2) }}>
                  <Avatar variant="rounded" sx={{ bgcolor: 'grey.300', width: 32, height: 32 }}>
                    <IconBolt color={theme.palette.text.primary} />
                  </Avatar>
                  <Typography variant="subtitle1">Customers</Typography>
                </Box>
              }
            />
            <Tab
              label={
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme.spacing(2) }}>
                  <Avatar variant="rounded" sx={{ bgcolor: 'grey.300', width: 32, height: 32 }}>
                    <IconBolt color={theme.palette.text.primary} />
                  </Avatar>
                  <Typography variant="subtitle1">Goods & Services</Typography>
                </Box>
              }
            />
            <Tab
              label={
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme.spacing(2) }}>
                  <Avatar variant="rounded" sx={{ bgcolor: 'grey.300', width: 32, height: 32 }}>
                    <IconBolt color={theme.palette.text.primary} />
                  </Avatar>
                  <Typography variant="subtitle1">Invoices</Typography>
                </Box>
              }
            />
          </Tabs>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ mt: 1, px: 2 }}>{renderTabContent()}</Box>
      </Grid>
    </Grid>
  );
}
