'use client';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { Button, Box, Typography, Stack } from '@mui/material';

import HolidayManagement from './HolidayManagement';
import LeaveManagement from './LeaveManagement';

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

const LeaveAttendance = ({ type }) => {
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab

  // Function to handle tab changes
  const handleTabChange = (_event, newTabIndex) => setActiveTab(newTabIndex);

  // Accessibility props for tabs
  const a11yProps = (index) => ({
    value: index,
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  });

  // Tab labels
  const tabLabels = ['Holiday Management', 'leave Management'];
  const handleNext = () => {
    setActiveTab((prev) => (prev < 3 ? prev + 1 : prev));
  };
  const handleBack = () => {
    setActiveTab((prev) => (prev < 3 ? prev - 1 : prev));
  };
  return (
    <Box>
      <Typography textAlign="center" variant="h5">
        Salary Components
      </Typography>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="Statutory Components Tabs">
          {tabLabels.map((label, index) => (
            <Tab key={index} label={label} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>

      <TabPanel value={activeTab} index={0}>
        <HolidayManagement handleNext={handleNext} />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <LeaveManagement handleNext={handleNext} />
      </TabPanel>
    </Box>
  );
};

LeaveAttendance.propTypes = {
  type: PropTypes.any
};

export default LeaveAttendance;
