'use client';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { IconBolt } from '@tabler/icons-react';
import { Avatar, Box, Grid, Tab, Tabs, Typography } from '@mui/material';

import Factory from '@/utils/Factory';
import ComponentsWrapper from '@/components/ComponentsWrapper';
import PresentationCard from '@/components/cards/PresentationCard';
import EpfComponent from './EPFComponent';
import ESIComponent from './ESIComponent';
import ProfessionalTax from './ProfessionalTax';
// import TabFour from './Invoices';
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

const StatuitoryComponents = ({ type }) => {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();

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
  const tabLabels = ['EPF', 'ESI', 'Professional Tax'];

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
        {tabLabels.map((_, index) => (
          <TabPanel key={index} value={activeTab} index={index}>
            {index === 0 && <EpfComponent onNext={handleNext} />}
            {index === 1 && <ESIComponent onNext={handleNext} />}
            {index === 2 && <ProfessionalTax onNext={handleNext} />}
          </TabPanel>
        ))}
      </Grid>
    </Grid>
  );
};

StatuitoryComponents.propTypes = {
  type: PropTypes.any
};

export default StatuitoryComponents;
