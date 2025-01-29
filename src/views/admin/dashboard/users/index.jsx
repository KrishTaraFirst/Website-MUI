'use client';
import React, { useState } from 'react';
import UserBehaviourTable from '@/sections/dashboard/analytics/user-behavior';
import AnalyticsBehaviorTable from './DataTable';
import { useRouter } from 'next/navigation';
import ManageAccess from './manage-access';
import { Stack, Typography, Button } from '@mui/material';
import { IconSparkles } from '@tabler/icons-react';
import EditUser from './edit-user';
import { Subtitles } from '@mui/icons-material';

// const addUser = async (type) => {
//   let url = `/user_management/users/by-type/?user_type=${type}`;
//   const { res } = await Factory('get', url, {});
//   if (res.status_cd === 0) {
//     setData(res.data.users);
//   } else {
//     showSnackbar(JSON.stringify(res.data), 'error');
//   }
// };

export default function Dashboard({ tab }) {
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const renderComponent = () => {
    switch (tab) {
      case 'corporate-entities':
        return <CorporateEntity setOpen={setOpen} setRefresh={setRefresh} />;
      case 'service-providers':
        return <ServiceProvider setOpen={setOpen} setRefresh={setRefresh} />;
      case 'ca-firms':
        return <CAFirm setOpen={setOpen} setRefresh={setRefresh} />;
      case 'individual':
      default:
        return <Individual setOpen={setOpen} setRefresh={setRefresh} />;
    }
  };
  return (
    <>
      {renderComponent()}
      <EditUser setRefresh={setRefresh} type="add" open={open} setOpen={setOpen} user_type={tab} />
    </>
  );
}

const RenderHead = ({ children, title, subTitle, setOpen }) => {
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
              setOpen(true);
            }}
            startIcon={<IconSparkles size={16} />}
          >
            Add {title}
          </Button>
        </Stack>
      </Stack>
      {children}
    </>
  );
};

function CorporateEntity({ setOpen, setRefresh }) {
  const router = useRouter();
  // const [editUserDialog, setEditUserDialog] = useState(false);
  // useEffect(() => {
  //   getUsers();
  // }, []);

  return (
    <RenderHead title="Corporate Entity" subTitle="List of users under Corporate Entity" setOpen={setOpen}>
      <AnalyticsBehaviorTable type={'Business'} setRefresh={setRefresh} />
    </RenderHead>
  );
}

function ServiceProvider({ setOpen, setRefresh }) {
  return (
    <RenderHead title="Service Provider" subTitle="List of users under Service Provider" setOpen={setOpen}>
      <UserBehaviourTable />
    </RenderHead>
  );
}

function CAFirm({ setOpen, setRefresh }) {
  return (
    <RenderHead title="Charted Accountant Firm" subTitle="List of users under Charted Accountant Firm" setOpen={setOpen}>
      <AnalyticsBehaviorTable type={'CA'} setRefresh={setRefresh} />
    </RenderHead>
  );
}

function Individual({ setOpen, setRefresh }) {
  return (
    <RenderHead title="Individual" subTitle="List of users under Individual" setOpen={setOpen}>
      <AnalyticsBehaviorTable type={'Individual'} setRefresh={setRefresh} />
    </RenderHead>
  );
}
