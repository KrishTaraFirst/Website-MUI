'use client';
import React, { useState } from 'react';
import AnalyticsBehaviorTable from './DataTable';
import { useRouter } from 'next/navigation';
import ManageAccess from './manage-access';
import { Stack, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, OutlinedInput } from '@mui/material';
import { IconSparkles } from '@tabler/icons-react';
import EditUser from './edit-user';
import { Subtitles } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import Factory from '@/utils/Factory';
import SvgIcon from '@/components/SvgIcon';
import { useSnackbar } from '@/components/CustomSnackbar';

export default function Dashboard({ tab }) {
  const { showSnackbar } = useSnackbar();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [affiliationDialog, setAffiliationDialog] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [results, setResults] = useState([]);

  const [searchEmail, setSearchEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const renderComponent = () => {
    switch (tab) {
      case 'corporate-entities':
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
          <Stack sx={{ gap: 0.5 }}>
            <Typography variant="subtitle2" color="grey.700">
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
              <Stack direction={'row'} key={item.user_name} sx={{ gap: 1 }}>
                <Typography variant="subtitle2" color="grey.900">
                  {item.first_name + ' ' + item.last_name}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between' }}>
          <Button variant="outlined" color="error" onClick={() => setAffiliationDialog(false)} autoFocus>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={() => console.log('hi')}>
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
            Create {title === 'Team' ? 'User' : title + ' User'}
          </Button>
        </Stack>
      </Stack>
      {children}
    </>
  );
};

function CorporateEntity({ setOpen, refresh, setAffiliationDialog }) {
  const router = useRouter();
  // const [editUserDialog, setEditUserDialog] = useState(false);
  // useEffect(() => {
  //   getUsers();
  // }, []);

  return (
    <RenderHead
      title="Corporate Entity"
      subTitle="List of users under Corporate Entity"
      setOpen={setOpen}
      setAffiliationDialog={setAffiliationDialog}
    >
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
