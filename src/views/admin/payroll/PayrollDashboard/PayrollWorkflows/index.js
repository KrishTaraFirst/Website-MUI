'use client';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Tab, Tabs, Typography, Stack, Avatar, Button } from '@mui/material';
import HomeCard from '@/components/cards/HomeCard';
import { IconBolt } from '@tabler/icons-react';
import MainCard from '@/components/MainCard';
import NewJoiners from './NewJoiners';
import Exits from './Exits';
import Attendance from './Attendance';
import LoansAndAdvances from './LoansAndAdvances';
import BonusAndIncentives from './BonusAndIncentives';
import SalaryRevisions from './SalaryRevisions';
import AdhocReimbursements from './AdhocReimbursements';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from 'next/navigation';
import RenderDialog from './RenderDialog';
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

const PayrollWorkflows = ({ type }) => {
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab
  const theme = useTheme(); // Getting the theme
  const [openDialog, setOpenDialog] = useState(false);
  const [payrollid, setPayrollId] = useState(null); // Payroll ID fetched from URL
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const id = searchParams.get('payrollid');
    if (id) {
      setPayrollId(id);
    }
  }, [searchParams]);
  const handleTabChange = (_event, newTabIndex) => setActiveTab(newTabIndex);

  // Accessibility props for tabs
  const a11yProps = (index) => ({
    value: index,
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  });

  // Tab labels
  const tabLabels = [
    'New Joiners',
    'Exits',
    'Attandance',
    'Loans & Advances',
    'Bonus & Incentives',
    'Salary Revisions',
    'Adhoc Reimbursements'
  ];
  const handleNext = () => {
    setActiveTab((prev) => (prev < 3 ? prev + 1 : prev));
  };
  const handleBack = () => {
    setActiveTab((prev) => (prev < 3 ? prev - 1 : prev));
  };
  const departmentFields = [
    { name: 'dept_name', label: 'Department Name' },
    { name: 'dept_code', label: 'Department Code' },
    { name: 'description', label: 'Description' }
  ];
  return (
    <HomeCard
      title="Employee Dashboard"
      tagline="Payroll Workflow"
      CustomElement={() => (
        <Stack direction="row" sx={{ gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (tabLabels[activeTab] === 'New Joiners') {
                router.push(`/payrollsetup/add-employee?payrollid=${payrollid}`);
              }
              setOpenDialog(true);
            }}
          >
            {`Add ${tabLabels[activeTab]}`}
          </Button>
        </Stack>
      )}
    >
      <MainCard>
        <Tabs
          variant="fullWidth"
          scrollButtons={true}
          value={activeTab}
          sx={{ borderBottom: '1px solid #e9e9e9' }}
          onChange={handleTabChange}
        >
          {tabLabels.map((label, index) => (
            <Tab
              label={
                <Stack direction="row" sx={{ alignItems: 'center' }}>
                  <Avatar variant="rounded" sx={{ mr: 1, bgcolor: 'grey.300', width: 32, height: 30 }}>
                    <IconBolt color={theme.palette.text.primary} />
                  </Avatar>
                  <Typography variant="subtitle1">{label}</Typography>
                </Stack>
              }
              // label={label}
              key={'Tab' + index}
              {...a11yProps(index)}
              sx={{
                fontSize: '1rem',
                textTransform: 'none',
                p: 1,
                py: 2
              }}
            />
          ))}
        </Tabs>

        <TabPanel value={activeTab} index={0}>
          <NewJoiners handleNext={handleNext} />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <Exits handleNext={handleNext} handleBack={handleBack} />
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          <Attendance handleNext={handleNext} handleBack={handleBack} />
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <LoansAndAdvances handleNext={handleNext} handleBack={handleBack} />
        </TabPanel>

        <TabPanel value={activeTab} index={4}>
          <BonusAndIncentives handleNext={handleNext} handleBack={handleBack} />
        </TabPanel>

        <TabPanel value={activeTab} index={5}>
          <SalaryRevisions handleNext={handleNext} handleBack={handleBack} />
        </TabPanel>

        <TabPanel value={activeTab} index={6}>
          <AdhocReimbursements handleNext={handleNext} handleBack={handleBack} />
        </TabPanel>
      </MainCard>
      {openDialog && <RenderDialog openDialog={openDialog} setOpenDialog={setOpenDialog} fields={departmentFields} />}{' '}
    </HomeCard>
  );
};

PayrollWorkflows.propTypes = {
  type: PropTypes.any
};

export default PayrollWorkflows;
