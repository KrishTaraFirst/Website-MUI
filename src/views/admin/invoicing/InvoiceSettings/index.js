'use client';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { IconBolt } from '@tabler/icons-react';
import { Avatar, Box, Button, Grid2, Tab, Tabs, Typography } from '@mui/material';

import Factory from '@/utils/Factory';
import ComponentsWrapper from '@/components/ComponentsWrapper';
import PresentationCard from '@/components/cards/PresentationCard';
import TabOne from './BusinessProfile';
import TabTwo from './Customers';
import TabThree from './Goods&Services';
import TabFour from './Invoices';
import MainCard from '@/components/MainCard';
import useCurrentUser from '@/hooks/useCurrentUser';
import Loader from '@/components/PageLoader';
import { useSnackbar } from '@/components/CustomSnackbar';

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
  const [activeTab, setActiveTab] = useState(0);
  const [businessDetails, setBusinessDetails] = useState({});
  const [customers, setCustomers] = useState([]);
  const [postType, setPostType] = useState('');
  const [loading, setLoading] = useState(false); // State for loader
  const { showSnackbar } = useSnackbar();

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

  const getCustomersData = async (id) => {
    setLoading(true);
    const { res } = await Factory('get', `/invoicing/customer_profiles/?invoicing_profile_id=${id}`, {});
    if (res.status_cd === 0) {
      setCustomers(res.data.customer_profiles);
    } else {
      showSnackbar(JSON.stringify(res?.data?.data), 'error');
    }
    setLoading(false);
  };

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

  // const fetch_business_Details_by_client = async () => {
  //   setLoading(true);
  //   let url = `/user_management/businesses-by-client/?user_id=${userData.id}`;
  //   const { res, error } = await Factory('get', url, {});
  //   if (res?.status_cd === 0) {
  //     setBusinessDetails(res?.data);
  //   } else {
  //     showSnackbar(JSON.stringify(res?.data?.data || error), 'error');
  //   }
  //   setLoading(false);
  // };
  const fetch_business_Details_by_businessId = async () => {
    setLoading(true);
    let id = userData.user_type === 'Business' ? userData.business_affiliated[0].id : userData.businesssDetails.business[0].id;

    let url = `/user_management/businesses/${id}/`;
    const { res, error } = await Factory('get', url, {});
    if (res?.status_cd === 0) {
      setBusinessDetails(res?.data);
    } else {
      showSnackbar(JSON.stringify(res?.data?.data || error), 'error');
    }
    setLoading(false);
  };

  const fetch_Invoicing_profile = async () => {
    let id = userData.user_type === 'Business' ? userData.business_affiliated[0].id : userData.businesssDetails.business[0].id;

    let url = `/invoicing/invoicing-profiles/?business_id=${id}`;
    const { res } = await Factory('get', url, {});
    if (res.status_cd === 0) {
      const businessData = { ...res.data };
      setBusinessDetails(businessData);
      setPostType('put');
      getCustomersData(res.data.id);
    } else if (res.status === 404 && res.data.message === 'Invoicing profile not found.') {
      fetch_business_Details_by_businessId();
      setPostType('post');
    } else {
      showSnackbar(JSON.stringify(res?.statusText), 'error');
    }
  };
  useEffect(() => {
    fetch_Invoicing_profile();
  }, [activeTab]);

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
              {index === 0 && (
                <TabOne businessDetails={businessDetails} setBusinessDetails={setBusinessDetails} onNext={handleNext} postType={postType} />
              )}
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
        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={handleBack} sx={{ mt: 3 }} disabled={activeTab === 0}>
            Back
          </Button>

          <Button
            variant="contained"
            onClick={handleNext}
            sx={{ mt: 3 }}
            disabled={activeTab === tabLabels.length - 1} // Disable Next button on the last tab
          >
            Next
          </Button>
        </Box>
      </Grid2>
    </Grid2>
  );
};

BasicTabs.propTypes = {
  type: PropTypes.any
};

export default BasicTabs;
