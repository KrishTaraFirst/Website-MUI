'use client';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { IconBolt } from '@tabler/icons-react';
import { Avatar, Box, Grid, Tab, Tabs, Typography } from '@mui/material';

import Factory from '@/utils/Factory';
import ComponentsWrapper from '@/components/ComponentsWrapper';
import PresentationCard from '@/components/cards/PresentationCard';
import TabOne from './BusinessProfile';
import TabTwo from './Customers';
import TabThree from './Goods&Services';
import TabFour from './Invoices';
import MainCard from '@/components/MainCard';
/***************************  NAVIGATION - TABS  ***************************/

// TabPanel component for rendering content based on active tab
const TabPanel = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
    {value === index && <Box sx={{ pt: 2.5 }}>{children}</Box>}
  </div>
);

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
};

const BasicTabs = ({ type }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [businessDetails, setBusinessDetails] = useState({});
  const [customers, setCustomers] = useState([]);
  const theme = useTheme();

  // Fetch business details on tab change
  useEffect(() => {
    const fetchBusinessDetails = async () => {
      const { res } = await Factory('get', '/invoicing/invoicing-profiles/', {});
      if (res) {
        setBusinessDetails(res.data);
      }
    };
    fetchBusinessDetails();
  }, [activeTab]);

  // Fetch customer data initially
  const getCustomersData = async () => {
    const { res } = await Factory('get', '/invoicing/customer_profiles/', {});
    if (res.status_cd === 0) {
      setCustomers(res.data.customer_profiles);
    }
  };

  useEffect(() => {
    getCustomersData();
  }, []);

  // Handle tab changes
  const handleTabChange = (_event, newTabIndex) => setActiveTab(newTabIndex);

  // Handle next tab navigation
  const handleNext = () => {
    setActiveTab((prev) => (prev < 3 ? prev + 1 : prev));
  };

  // Accessibility props for each tab
  const a11yProps = (index) => ({
    value: index,
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  });

  // Tab labels for rendering
  const tabLabels = ['Business Profile', 'Customers', 'Goods & Services', 'Invoice Number Format'];

  return (
    <Grid container spacing={{ xs: 2, sm: 3 }}>
      {/* Tab navigation */}
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            value={activeTab}
            onChange={handleTabChange}
            aria-label="basic tabs example"
            {...{ type }}
          >
            {tabLabels.map((label, index) => (
              <Tab
                key={index}
                label={
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar variant="rounded" sx={{ bgcolor: 'grey.300', width: 32, height: 30 }}>
                      <IconBolt color={theme.palette.text.primary} />
                    </Avatar>
                    <Typography variant="subtitle1">{label}</Typography>
                  </Box>
                }
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </Box>
      </Grid>

      {/* Tab content with PresentationCard and ComponentsWrapper */}
      <Grid item xs={12}>
        <MainCard>
          {tabLabels.map((_, index) => (
            <TabPanel key={index} value={activeTab} index={index}>
              {index === 0 && <TabOne businessDetails={businessDetails} setBusinessDetails={setBusinessDetails} onNext={handleNext} />}
              {index === 1 && (
                <TabTwo
                  getCustomersData={getCustomersData}
                  customers={customers}
                  businessDetails={businessDetails}
                  setBusinessDetails={setBusinessDetails}
                />
              )}
              {index === 2 && <TabThree businessDetails={businessDetails} setBusinessDetails={setBusinessDetails} />}
              {index === 3 && (
                <TabFour
                  getCustomersData={getCustomersData}
                  customers={customers}
                  businessDetails={businessDetails}
                  setBusinessDetails={setBusinessDetails}
                />
              )}
            </TabPanel>
          ))}
        </MainCard>
      </Grid>
    </Grid>
  );
};

BasicTabs.propTypes = {
  type: PropTypes.any
};

export default BasicTabs;
