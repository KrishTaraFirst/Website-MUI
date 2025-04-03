'use client';
import React, { useState, useEffect } from 'react';
import Payrollsettings from './Payrollsettings';
import PayrollDashboard from './PayrollDashboard';
import useCurrentUser from '@/hooks/useCurrentUser';
import Factory from '@/utils/Factory';

import Loader from '@/components/PageLoader';

function PayrollPage() {
  const { userData } = useCurrentUser();

  const [PayrollSetup, setPayrollSetup] = useState(false);
  const getData = async () => {
    const url = `/user_management/businesses-by-client/?user_id=${userData.id}`;
    const { res, error } = await Factory('get', url, {});
    // if (res?.status_cd === 0) {
    //   setPayrollDetails(res?.data);
    // } else {
    //   setPayrollDetails({}); // Ensure workLocations is reset if there's an error or invalid data
    //   // Optionally show a snackbar error here if needed
    //   // showSnackbar(JSON.stringify(res?.data?.data || error), 'error');
    // }
  };

  useEffect(() => {
    getData();
  }, []);
  console.log('anans');
  return <div>{PayrollSetup ? <Payrollsettings /> : <PayrollDashboard setPayrollSetup={setPayrollSetup} />}</div>;
}

export default PayrollPage;
