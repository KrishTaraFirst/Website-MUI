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

/***************************  ANALYTICS - OVERVIEW  ***************************/

export default function AnalyticsOverview() {
  const { userData } = useCurrentUser();

  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [businessDetails, setBusinessDetails] = useState({});
  const [invoicesList, setInvoicesList] = useState([]);
  const chipDefaultProps = { color: 'black', variant: 'text', size: 'small' };
  const { showSnackbar } = useSnackbar();
  const [clientListData, setClientListData] = useState({});
  const [businessId, setBusinessId] = useState(null);
  const [type, setType] = useState('');
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const getInvoicesList = async () => {
    if (businessDetails?.id) {
      let url = `/invoicing/invoice-retrieve/${businessDetails?.id}`;
      const { res } = await Factory('get', url, {});
      if (res.status_cd === 0) {
        setInvoicesList(res.data.invoices);
      }
    }
  };
  const fetchBusinessDetails = async () => {
    const { res } = await Factory('get', `/invoicing/invoicing-profiles/?business_id=${businessId}`, {});
    if (res.status_cd === 0) {
      const businessData = { ...res.data, state: 'Telangana' };
      setBusinessDetails(businessData);
    } else {
      router.push(`invoicing/settings`);
    }
  };
  useEffect(() => {
    if (businessId) {
      fetchBusinessDetails(businessId);
    }
  }, [businessId]);

  const fetch_business_Details = async () => {
    const url = `/payroll/payroll-setup-status?user_id=${userData.id}`;
    const { res, error } = await Factory('get', url, {});
    if (res?.status_cd === 0) {
      setBusinessId(res?.data.id);
    } else {
      showSnackbar(JSON.stringify(res?.data?.data || error), 'error');
    }
  };
  useEffect(() => {
    fetch_business_Details();
  }, []);
  return (
    <Stack sx={{ gap: 3 }}>
      <Stack direction="row" sx={{ alignItems: 'end', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
        <Stack direction="column" sx={{ gap: 0.5 }}>
          <Typography variant="h4" sx={{ fontWeight: 400 }}>
            Invoicing
          </Typography>
          <Typography variant="caption" sx={{ color: 'grey.700' }}>
            Dashboard to help manage your customer invoices.
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ gap: 1.5 }}>
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
      </Stack>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid size={12}>
          <OverviewCard
            invoicesList={invoicesList}
            businessDetailsData={businessDetails}
            open={open}
            onClose={handleClose}
            getInvoicesList={getInvoicesList}
            clientListData={clientListData}
            type={type}
            setType={setType}
            handleOpen={handleOpen}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
