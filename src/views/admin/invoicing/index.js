'use client';
import Grid from '@mui/material/Grid2';
import { usePathname, useRouter } from 'next/navigation';

import Factory from '@/utils/Factory';
import { useState, useEffect } from 'react';

// @project
import { useSnackbar } from '@/components/CustomSnackbar';
import OverviewCard from './InvoiceCards/OverviewCard';
import { Button, Stack, Typography } from '@mui/material';
import { IconSparkles, IconSettings2 } from '@tabler/icons-react';
import AddInvoice from './InvoicingComponent/AddInvoice';
import useCurrentUser from '@/hooks/useCurrentUser';
import { CoPresentOutlined } from '@mui/icons-material';
import Loader from '@/components/PageLoader';
import HomeCard from '@/components/cards/HomeCard';
import MainCard from '@/components/MainCard';

/***************************  ANALYTICS - OVERVIEW  ***************************/

export default function AnalyticsOverview() {
  const { userData } = useCurrentUser();

  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [businessDetails, setBusinessDetails] = useState({});
  const chipDefaultProps = { color: 'black', variant: 'text', size: 'small' };
  const { showSnackbar } = useSnackbar();
  const [clientListData, setClientListData] = useState({});
  const [businessId, setBusinessId] = useState(null);
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false); // State for loader

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const invoice_settings_status_check = async () => {
    setLoading(true);
    // let id = userData.user_type === 'Business' ? userData.id : userData.businesssDetails.business[0].id;
    let id = userData.user_type === 'Business' ? userData.business_affiliated[0].id : userData.businesssDetails.business[0].id;
    let url = `/invoicing/invoicing-profile-check/?business_id=${id}`;
    const { res } = await Factory('get', url, {});
    setLoading(false);
    if (res.status_cd === 0 && res.data.exists === false) {
      router.push(`invoicing/settings`);
    } else if (res.status_cd === 0 && res.data.exists === true) {
      setBusinessId(res.data.invoicing_profile_id);
    } else {
      showSnackbar(JSON.stringify(res?.statusText), 'error');
    }
  };
  useEffect(() => {
    invoice_settings_status_check();
  }, [userData.user_type]);
  return (
    <HomeCard
      title=" Invoicing"
      tagline=" Dashboard to help manage your customer invoices."
      CustomElement={() => (
        <Stack direction="row" sx={{ gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => {
              router.push(`${pathname}/settings`);
            }}
            startIcon={<IconSettings2 size={18} />}
          >
            Invoice Settings
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setType('add');
              // handleOpen();
              router.push(`${pathname}/generateInvoice`);
            }}
            startIcon={<IconSparkles size={16} />}
          >
            New Invoice
          </Button>
        </Stack>
      )}
    >
      <MainCard>
        {loading ? (
          <Loader />
        ) : (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid size={12}>
              <OverviewCard
                businessId={businessId}
                open={open}
                onClose={handleClose}
                clientListData={clientListData}
                type={type}
                setType={setType}
                handleOpen={handleOpen}
              />
            </Grid>
          </Grid>
        )}
      </MainCard>
    </HomeCard>
  );
}
