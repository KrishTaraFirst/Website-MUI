'use client';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Tab, Tabs, Typography } from '@mui/material';
import EpfComponent from './EPFComponent';
import ESIComponent from './ESIComponent';
import ProfessionalTax from './ProfessionalTax';
import HomeCard from '@/components/cards/HomeCard';

/***************************  NAVIGATION - TABS  ***************************/

// TabPanel component to render the content for each tab
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

const StatutoryComponents = ({ type }) => {
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab
  const theme = useTheme(); // Getting the theme

  // Function to handle tab changes
  const handleTabChange = (_event, newTabIndex) => setActiveTab(newTabIndex);

  // Accessibility props for tabs
  const a11yProps = (index) => ({
    value: index,
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  });

  // Tab labels
  const tabLabels = ['EPF', 'ESI', 'Professional Tax'];
  const handleNext = () => {
    setActiveTab((prev) => (prev < 3 ? prev + 1 : prev));
  };
  const handleBack = () => {
    setActiveTab((prev) => (prev < 3 ? prev - 1 : prev));
  };
  return (
    <HomeCard title="Statutory Components" tagline="Setup your organization before starting payroll">
      {/* Centering the Tabs section */}
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="Statutory Components Tabs">
          {tabLabels.map((label, index) => (
            <Tab key={index} label={label} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>

      {/* Tab Panels - Display content based on activeTab */}
      <TabPanel value={activeTab} index={0}>
        <EpfComponent handleNext={handleNext} />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <ESIComponent handleNext={handleNext} handleBack={handleBack} />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <ProfessionalTax handleNext={handleNext} handleBack={handleBack} />
      </TabPanel>
    </HomeCard>
  );
};

StatutoryComponents.propTypes = {
  type: PropTypes.any
};

export default StatutoryComponents;
