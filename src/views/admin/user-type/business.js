'use client';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { IconBolt } from '@tabler/icons-react';
import { Avatar, Box, Grid, Tab, Tabs, Typography } from '@mui/material';

import Factory from '@/utils/Factory';
import BusinessKYC from './AddBusiness';
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

  // // Fetch business details on tab change
  // useEffect(() => {
  //   const fetchBusinessDetails = async () => {
  //     const { res } = await Factory('get', '/invoicing/invoicing-profiles/', {});
  //     if (res) {
  //       setBusinessDetails(res.data);
  //     }
  //   };
  //   fetchBusinessDetails();
  // }, [activeTab]);

  // Handle tab changes
  const handleTabChange = (_event, newTabIndex) => setActiveTab(newTabIndex);

  // Handle next tab navigation
  const handleNext = () => {
    setActiveTab((prev) => (prev < 3 ? prev + 1 : prev));
  };
  const handleBack = () => {
    setActiveTab((prev) => (prev < 3 ? prev - 1 : prev));
  };
  // Accessibility props for each tab
  const a11yProps = (index) => ({
    value: index,
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  });

  // Tab labels for rendering
  const tabLabels = ['Business Deatils', 'GST etails'];

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
              {index === 0 && <BusinessKYC onNext={handleNext} />}
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
