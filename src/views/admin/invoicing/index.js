// 'use client';
// import { useState, useEffect } from 'react';
// import { useTheme } from '@mui/material/styles';

// // @mui
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';
// import TabOne from './BusinessProfile/index';
// import TabTwo from './Customers/index';
// import TabThree from './Goods&Services/index';
// import TabFour from './InvoiceNumberFormat/index';
// import Avatar from '@mui/material/Avatar';
// import Factory from '@/utils/Factory';
// // @assets
// import { IconBolt } from '@tabler/icons-react';

// /***************************  ACCOUNT  ***************************/

// export default function Account() {
//   const theme = useTheme();

//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const [activeTab, setActiveTab] = useState(0);
//   const [businessDetails, setBusinessDetails] = useState({});

//   const handleNext = () => {
//     setActiveTab((prev) => (prev < 3 ? prev + 1 : prev));
//   };
//   const getBusinessDetails = async () => {
//     const { res } = await Factory('get', '/invoicing/invoicing-profiles/', {});
//     if (res) {
//       setBusinessDetails(res.data);
//     }
//   };

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 0:
//         return <TabOne businessDetails={businessDetails} setBusinessDetails={setBusinessDetails} onNext={handleNext} />;
//       case 1:
//         return <TabTwo businessDetails={businessDetails} setBusinessDetails={setBusinessDetails} onNext={handleNext} />;
//       case 2:
//         return <TabThree businessDetails={businessDetails} setBusinessDetails={setBusinessDetails} onNext={handleNext} />;
//       case 3:
//         return <TabFour businessDetails={businessDetails} setBusinessDetails={setBusinessDetails} onNext={handleNext} />;
//       default:
//         return null;
//     }
//   };

//   useEffect(() => {
//     getBusinessDetails();
//   }, [activeTab]);
//   return (
//     <Grid container spacing={{ xs: 2, sm: 3 }}>
//       <Grid item xs={12}>
//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
//           <Tabs
//             value={activeTab}
//             onChange={(e, newValue) => setActiveTab(newValue)}
//             centered
//             sx={{
//               '& .MuiTab-root': {
//                 marginRight: theme.spacing(4)
//               },
//               '& .MuiTab-root:last-child': {
//                 marginRight: 0
//               }
//             }}
//           >
//             <Tab
//               label={
//                 <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme.spacing(2) }}>
//                   <Avatar variant="rounded" sx={{ bgcolor: 'grey.300', width: 32, height: 32 }}>
//                     <IconBolt color={theme.palette.text.primary} />
//                   </Avatar>
//                   <Typography variant="subtitle1">Business Profile</Typography>
//                 </Box>
//               }
//             />
//             <Tab
//               label={
//                 <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme.spacing(2) }}>
//                   <Avatar variant="rounded" sx={{ bgcolor: 'grey.300', width: 32, height: 32 }}>
//                     <IconBolt color={theme.palette.text.primary} />
//                   </Avatar>
//                   <Typography variant="subtitle1">Customers</Typography>
//                 </Box>
//               }
//             />
//             <Tab
//               label={
//                 <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme.spacing(2) }}>
//                   <Avatar variant="rounded" sx={{ bgcolor: 'grey.300', width: 32, height: 32 }}>
//                     <IconBolt color={theme.palette.text.primary} />
//                   </Avatar>
//                   <Typography variant="subtitle1">Goods & Services</Typography>
//                 </Box>
//               }
//             />
//             <Tab
//               label={
//                 <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme.spacing(2) }}>
//                   <Avatar variant="rounded" sx={{ bgcolor: 'grey.300', width: 32, height: 32 }}>
//                     <IconBolt color={theme.palette.text.primary} />
//                   </Avatar>
//                   <Typography variant="subtitle1">Invoices</Typography>
//                 </Box>
//               }
//             />
//           </Tabs>
//         </Box>
//       </Grid>
//       <Grid item xs={12}>
//         <Box sx={{ mt: 1, px: 2 }}>{renderTabContent()}</Box>
//       </Grid>
//     </Grid>
//   );
// }
'use client';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { IconBolt } from '@tabler/icons-react';
import { Avatar, Box, Grid, Tab, Tabs, Typography } from '@mui/material';

import TabOne from './BusinessProfile';
import TabTwo from './Customers';
import TabThree from './Goods&Services';
import TabFour from './Invoices';
import Factory from '@/utils/Factory';

/***************************  TABS - PANEL  ***************************/

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
      {value === index && <Box sx={{ pt: 2.5 }}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
};

/***************************  MAIN COMPONENT  ***************************/

const BasicTabs = ({ type }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [businessDetails, setBusinessDetails] = useState({});
  const [customers, setCustomers] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      const { res } = await Factory('get', '/invoicing/invoicing-profiles/', {});
      if (res) setBusinessDetails(res.data);
    };
    fetchBusinessDetails();
  }, [activeTab]);

  const handleTabChange = (_event, newTabIndex) => setActiveTab(newTabIndex);

  const getCustomersData = async () => {
    let url = '/invoicing/customer_profiles/';
    const { res } = await Factory('get', url, {});
    if (res.status_cd === 0) {
      setCustomers(res.data.customer_profiles);
    }
  };

  useEffect(() => {
    getCustomersData();
  }, []);
  const handleNext = () => {
    setActiveTab((prev) => (prev < 3 ? prev + 1 : prev));
  };
  return (
    <Grid container spacing={{ xs: 2, sm: 3 }}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            value={activeTab}
            onChange={handleTabChange}
            aria-label="basic tabs example"
            {...{ type }}
          >
            {['Business Profile', 'Customers', 'Goods & Services', 'Invoices'].map((label, index) => (
              <Tab
                key={index}
                label={
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme.spacing(2) }}>
                    <Avatar variant="rounded" sx={{ bgcolor: 'grey.300', width: 32, height: 32 }}>
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

      <Grid item xs={12}>
        {['Business Profile', 'Customers', 'Goods & Services', 'Invoices'].map((label, index) => (
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
      </Grid>
    </Grid>
  );
};

BasicTabs.propTypes = {
  type: PropTypes.any
};

export default BasicTabs;

// Helper function for a11y props
function a11yProps(index) {
  return {
    value: index,
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}
