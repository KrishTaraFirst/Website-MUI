'use client';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { IconBolt } from '@tabler/icons-react';
import { Avatar, Box, Grid2, Tab, Tabs, Typography } from '@mui/material';

import Factory from '@/utils/Factory';
import ComponentsWrapper from '@/components/ComponentsWrapper';
import PresentationCard from '@/components/cards/PresentationCard';
import TabOne from './BusinessProfile';
import TabTwo from './Customers';
import TabThree from './Goods&Services';
import TabFour from './Invoices';
import MainCard from '@/components/MainCard';
import useCurrentUser from '@/hooks/useCurrentUser';

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
  const { userData } = useCurrentUser();
  // console.log(userData);
  const [activeTab, setActiveTab] = useState(0);
  const [businessDetails, setBusinessDetails] = useState({});
  const [customers, setCustomers] = useState([]);
  const theme = useTheme();

  // useEffect(() => {
  //   const fetchBusinessDetails = async () => {
  //     const { res } = await Factory('get', '/invoicing/invoicing-profiles/', {});
  //     if (res) {
  //       setBusinessDetails(res.data);
  //     }
  //   };
  //   fetchBusinessDetails();
  // }, [activeTab]);

  const getCustomersData = async () => {
    const { res } = await Factory('get', '/invoicing/customer_profiles/', {});
    if (res.status_cd === 0) {
      setCustomers(res.data.customer_profiles);
    }
  };

  useEffect(() => {
    getCustomersData();
  }, []);

  const handleTabChange = (_event, newTabIndex) => setActiveTab(newTabIndex);

  const handleNext = () => {
    setActiveTab((prev) => (prev < 3 ? prev + 1 : prev));
  };
  const handleBack = () => {
    setActiveTab((prev) => (prev < 3 ? prev - 1 : prev));
  };
  const a11yProps = (index) => ({
    value: index,
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  });

  const tabLabels = ['Business Profile', 'Customers', 'Goods & Services', 'Invoice Number Format'];
  const fetchBusinessDetails = async () => {
    // let id = userData.user_type === 'Business' ? userData.business_affiliated[0].id : userData.businesssDetails.business[0].id;
    let id =
      userData.user_type === 'Business' && userData.business_affiliated && userData.business_affiliated.length > 0
        ? userData.business_affiliated[0].id
        : userData.businesssDetails.business && userData.businesssDetails.business.length > 0
          ? userData.businesssDetails.business[0].id
          : null; // Or handle the case when no valid ID is found

    let url = `/invoicing/invoicing-profiles/?business_id=${id}`;
    const { res } = await Factory('get', url, {});
    console.log(res);
    // if (res.status_cd === 0) {
    //   const businessData = { ...res.data, state: 'Telangana' };
    //   setBusinessDetails(businessData);
    // } else if (res.status === 404) {
    // } else {
    //   return;
    // }
  };
  useEffect(() => {
    fetchBusinessDetails();
  }, []);
  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {/* Tab navigation */}
      <Grid2 size={{ xs: 12 }}>
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
      </Grid2>

      {/* Tab content with PresentationCard and ComponentsWrapper */}
      <Grid2 size={{ xs: 12 }}>
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
                  onNext={handleNext}
                  handleBack={handleBack}
                />
              )}
              {index === 2 && (
                <TabThree
                  businessDetails={businessDetails}
                  setBusinessDetails={setBusinessDetails}
                  onNext={handleNext}
                  handleBack={handleBack}
                />
              )}
              {index === 3 && (
                <TabFour
                  getCustomersData={getCustomersData}
                  customers={customers}
                  businessDetails={businessDetails}
                  setBusinessDetails={setBusinessDetails}
                  handleBack={handleBack}
                />
              )}
            </TabPanel>
          ))}
        </MainCard>
      </Grid2>
    </Grid2>
  );
};

BasicTabs.propTypes = {
  type: PropTypes.any
};

export default BasicTabs;
