'use client';
import React, { Fragment, useState, useEffect } from 'react';
import AnalyticsBehaviorTable from './DataTable';
import { useRouter } from 'next/navigation';
import ManageAccess from './manage-access';
import { AuthRole } from '@/enum';
import {
  Stack,
  Typography,
  Button,
  Dialog,
  ButtonGroup,
  DialogActions,
  DialogContent,
  DialogTitle,
  OutlinedInput,
  Divider,
  Box
} from '@mui/material';
import { IconSparkles } from '@tabler/icons-react';
import EditUser from './edit-user';
import { Subtitles } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import Factory from '@/utils/Factory';
import SvgIcon from '@/components/SvgIcon';
import { useSnackbar } from '@/components/CustomSnackbar';
import { motion } from 'framer-motion';

// const masterOptions = ['Individual', 'CA Firm', 'Business', 'Service Provider'];
const optionValues = { Individual: 'Individual', 'CA Firm': 'CA', Business: 'Business', 'Service Provider': 'ServiceProvider' };

export default function Dashboard({ tab }) {
  const [options, setOptions] = useState(['Individual', 'CA Firm', 'Business']);
  const { showSnackbar } = useSnackbar();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [affiliationDialog, setAffiliationDialog] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [results, setResults] = useState([]);
  const [affiliated, setAffiliated] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState('');

  useEffect(() => {
    let valueToRemove;
    let newArray = [''];
    switch (options) {
      case AuthRole.CORPORATE_ADMIN: {
        valueToRemove = 'Business';
        newArray = options.filter((item) => item !== valueToRemove);
        setOptions(newArray);
      }
      case AuthRole.CHARTED_ACCOUNTANT_FIRM: {
        valueToRemove = 'CA Firm';
        newArray = options.filter((item) => item !== valueToRemove);
        setOptions(newArray);
      }
      case AuthRole.SERVICE_PROVIDER: {
        valueToRemove = 'Service Provider';
        newArray = options.filter((item) => item !== valueToRemove);
        setOptions(newArray);
      }
      case AuthRole.INDIVIDUAL: {
        valueToRemove = 'Individual';
        newArray = options.filter((item) => item !== valueToRemove);
        setOptions(newArray);
      }
      default: {
        valueToRemove = 'Individual';
        newArray = options.filter((item) => item !== valueToRemove);
        setOptions(newArray);
      }
    }
    setSelected(newArray[0]);
  }, []);
  const renderComponent = () => {
    switch (tab) {
      case 'business':
        return <CorporateEntity setOpen={setOpen} setAffiliationDialog={setAffiliationDialog} refresh={refresh} />;
      case 'service-providers':
        return <ServiceProvider setOpen={setOpen} setAffiliationDialog={setAffiliationDialog} refresh={refresh} />;
      case 'ca-firms':
        return <CAFirm setOpen={setOpen} setAffiliationDialog={setAffiliationDialog} refresh={refresh} />;
      case 'team':
        return <Team setOpen={setOpen} setAffiliationDialog={setAffiliationDialog} refresh={refresh} />;
      case 'individual':
      default:
        return <Individual setOpen={setOpen} setAffiliationDialog={setAffiliationDialog} refresh={refresh} />;
    }
  };

  const handleSearchEmail = async () => {
    setLoading(true);
    setError('');
    let url = `/user_management/user-search?email=${searchEmail}`;
    const { res } = await Factory('get', url, {});
    if (res.status_cd === 0) {
      setResults([...res.data]);
      console.log(res.data);
      setLoading(false);
    } else {
      showSnackbar(res.data.error, 'error');
    }
  };

  const requestAffiliation = async (userId) => {
    setAffiliated((prev) => [...prev, userId]);
  };

  return (
    <>
      {renderComponent()}
      <EditUser setRefresh={setRefresh} type="add" open={open} setOpen={setOpen} user_type={tab} />
      <Dialog
        open={affiliationDialog}
        disableRestoreFocus
        maxWidth={false}
        sx={{ '& .MuiDialog-paper': { width: '400px', maxWidth: '90vw' } }}
      >
        <DialogTitle id="block-dialog-title">{'Request Affiliation'}</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle2" sx={{ pl: 0.8 }} color="grey.700">
            Choose a User Type
          </Typography>
          <Box display="flex" justifyContent="center" mt={0.5} mb={3}>
            <Box
              sx={{
                position: 'relative',
                display: 'inline-flex',
                // backgroundColor: '#e0e0e0',
                borderRadius: '50px',
                padding: '4px',
                width: '1200px', // Adjust width based on your design
                boxSizing: 'border-box',
                border: '1px solid #006397'
              }}
            >
              {/* Animated Background Pill */}
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 50 }}
                style={{
                  position: 'absolute',
                  top: '4px',
                  bottom: '4px',
                  left: `calc(${options.indexOf(selected)} * (100% / ${options.length}) + 4px)`,
                  width: `calc((100% / ${options.length}) - 8px)`,
                  backgroundColor: '#006397',
                  borderRadius: '50px',
                  zIndex: 0
                }}
              />

              {/* Buttons */}
              <ButtonGroup
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  width: '100%',
                  boxSizing: 'border-box',
                  '&:hover': { bgcolor: 'none' }
                }}
              >
                {options.map((option) => (
                  <Button
                    variant="text"
                    key={option}
                    onClick={() => setSelected(option)}
                    sx={{
                      flex: 1,
                      px: 3,
                      py: 1,
                      fontSize: '14px',
                      color: selected === option ? 'white' : 'grey.800',
                      transition: 'color 0.3s',
                      textTransform: 'none',
                      '&:hover': { bgcolor: 'none' }
                    }}
                  >
                    {option}
                  </Button>
                ))}
              </ButtonGroup>
            </Box>
          </Box>
          <Stack sx={{ gap: 0.5 }}>
            <Typography variant="subtitle2" sx={{ pl: 0.8 }} color="grey.700">
              Enter an email to search
            </Typography>
            <Stack direction={'row'} sx={{ gap: 1 }}>
              <OutlinedInput
                placeholder="Search here"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                slotProps={{ input: { 'aria-label': 'Search area' } }}
                sx={{
                  ...theme.typography.body2,

                  color: 'text.secondary',
                  width: 1,
                  pr: 2,
                  '& .MuiOutlinedInput-input': {
                    p: '10px 5px'
                  },
                  '& .MuiOutlinedInput-notchedOutline': { borderRadius: 2 }
                }}
                size="small"
                endAdornment={<SvgIcon name="tabler-search" size={20} color="grey.700" />}
              />
              <Button
                variant="outlined"
                onClick={() => {
                  handleSearchEmail();
                }}
              >
                Search
              </Button>
            </Stack>
          </Stack>
          <Stack sx={{ gap: 1.5, mt: 1.5 }}>
            {results.map((item, idx) => (
              <Fragment key={item.user_name}>
                <Divider />
                <Stack direction={'row'} sx={{ gap: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                  <Stack direction={'row'} sx={{ gap: 0.5 }}>
                    <Typography variant="subtitle2" color="grey.700" sx={{ pl: 1 }}>
                      Name:
                    </Typography>
                    <Typography variant="subtitle2" color="grey.900">
                      {item.first_name + ' ' + item.last_name}
                    </Typography>
                  </Stack>
                  {/* <Typography variant="subtitle2" color="grey.900">
                  Username: {item.user_name}
                </Typography> */}
                  <Button
                    variant="outlined"
                    onClick={() => {
                      requestAffiliation(item.id);
                    }}
                    size="small"
                    disabled={affiliated.includes(item.id)}
                  >
                    Request
                  </Button>
                </Stack>
              </Fragment>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setAffiliated([]);
              setSearchEmail('');
              setResults([]);
              setAffiliationDialog(false);
            }}
            autoFocus
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setAffiliated([]);
              setSearchEmail('');
              setResults([]);
              setAffiliationDialog(false);
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const RenderHead = ({ children, title, subTitle, setOpen, setAffiliationDialog }) => {
  return (
    <>
      <Stack direction="row" sx={{ justifyContent: 'space-between', flexWrap: 'wrap', mb: 2 }}>
        <Stack direction="column" sx={{ gap: 0 }}>
          <Typography variant="h4" sx={{ fontWeight: 400 }}>
            {title}
          </Typography>
          <Typography variant="caption" sx={{ color: 'grey.700' }}>
            {subTitle}
          </Typography>
        </Stack>

        <Stack direction="row">
          <Button
            variant="contained"
            onClick={() => {
              setAffiliationDialog(true);
            }}
            startIcon={<IconSparkles size={16} />}
            sx={{ mr: 1 }}
          >
            Request Affiliation
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(true);
            }}
            startIcon={<IconSparkles size={16} />}
          >
            {title === 'Team' ? 'Add User' : title === 'Business' ? 'Add Business' : 'Add' + title}
          </Button>
        </Stack>
      </Stack>
      {children}
    </>
  );
};

function CorporateEntity({ setOpen, refresh, setAffiliationDialog }) {
  const router = useRouter();
  return (
    <RenderHead title="Business" subTitle="List of users under businesses" setOpen={setOpen} setAffiliationDialog={setAffiliationDialog}>
      <AnalyticsBehaviorTable type={'Business'} refresh={refresh} />
    </RenderHead>
  );
}

function ServiceProvider({ setOpen, refresh, setAffiliationDialog }) {
  return (
    <RenderHead
      title="Service Provider"
      subTitle="List of users under Service Provider"
      setAffiliationDialog={setAffiliationDialog}
      setOpen={setOpen}
    >
      <AnalyticsBehaviorTable type={'ServiceProvider'} refresh={refresh} />
    </RenderHead>
  );
}

function CAFirm({ setOpen, refresh, setAffiliationDialog }) {
  return (
    <RenderHead
      title="Charted Accountant Firm"
      subTitle="List of users under Charted Accountant Firm"
      setAffiliationDialog={setAffiliationDialog}
      setOpen={setOpen}
    >
      <AnalyticsBehaviorTable type={'CA'} refresh={refresh} />
    </RenderHead>
  );
}

function Individual({ setOpen, refresh, setAffiliationDialog }) {
  return (
    <RenderHead title="Individual" subTitle="Individual Users" setAffiliationDialog={setAffiliationDialog} setOpen={setOpen}>
      <AnalyticsBehaviorTable type={'Individual'} refresh={refresh} />
    </RenderHead>
  );
}

function Team({ setOpen, refresh, setAffiliationDialog }) {
  return (
    <RenderHead title="Team" subTitle="List of users under your team" setAffiliationDialog={setAffiliationDialog} setOpen={setOpen}>
      <AnalyticsBehaviorTable type={'Team'} refresh={refresh} />
    </RenderHead>
  );
}
