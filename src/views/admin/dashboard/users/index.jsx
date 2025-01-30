'use client';
import React, { useState } from 'react';
import AnalyticsBehaviorTable from './DataTable';
import { useRouter } from 'next/navigation';
import ManageAccess from './manage-access';
import { Stack, Typography, Button } from '@mui/material';
import { IconSparkles } from '@tabler/icons-react';
import EditUser from './edit-user';
import { Subtitles } from '@mui/icons-material';

export default function Dashboard({ tab }) {
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const renderComponent = () => {
    switch (tab) {
      case 'corporate-entities':
        return <CorporateEntity setOpen={setOpen} refresh={refresh} />;
      case 'service-providers':
        return <ServiceProvider setOpen={setOpen} refresh={refresh} />;
      case 'ca-firms':
        return <CAFirm setOpen={setOpen} refresh={refresh} />;
      case 'individual':
      default:
        return <Individual setOpen={setOpen} refresh={refresh} />;
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

function CorporateEntity({ setOpen, refresh }) {
  const router = useRouter();
  // const [editUserDialog, setEditUserDialog] = useState(false);
  // useEffect(() => {
  //   getUsers();
  // }, []);

  return (
    <RenderHead title="Corporate Entity" subTitle="List of users under Corporate Entity" setOpen={setOpen}>
      <AnalyticsBehaviorTable type={'Business'} refresh={refresh} />
    </RenderHead>
  );
}

function ServiceProvider({ setOpen, refresh }) {
  return (
    <RenderHead title="Service Provider" subTitle="List of users under Service Provider" setOpen={setOpen}>
      <AnalyticsBehaviorTable type={'ServiceProvider'} refresh={refresh} />
    </RenderHead>
  );
}

function CAFirm({ setOpen, refresh }) {
  return (
    <RenderHead title="Charted Accountant Firm" subTitle="List of users under Charted Accountant Firm" setOpen={setOpen}>
      <AnalyticsBehaviorTable type={'CA'} refresh={refresh} />
    </RenderHead>
  );
}

function Individual({ setOpen, refresh }) {
  return (
    <RenderHead title="Individual" subTitle="List of users under Individual" setOpen={setOpen}>
      <AnalyticsBehaviorTable type={'Individual'} refresh={refresh} />
    </RenderHead>
  );
}
