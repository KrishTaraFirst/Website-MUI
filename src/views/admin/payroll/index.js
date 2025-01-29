'use client';
import React, { useState } from 'react';
import Payrollsettings from './Payrollsettings';
import PayrollDashboard from './PayrollDashboard';
function PayrollPage() {
  const [PayrollSetup, setPayrollSetup] = useState(false);

  // const getData = async () => {
  //   const url = `/payroll/business-payroll/${userData.id}/`;
  //   const { res, error } = await Factory('get', url, {});

  //   if (res?.status_cd === 0) {
  //     setPayrollDetails(res?.data);
  //   } else {
  //     setPayrollDetails({}); // Ensure workLocations is reset if there's an error or invalid data
  //     // Optionally show a snackbar error here if needed
  //     // showSnackbar(JSON.stringify(res?.data?.data || error), 'error');
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);
  return <div>{PayrollSetup ? <Payrollsettings /> : <PayrollDashboard setPayrollSetup={setPayrollSetup} />}</div>;
}

export default PayrollPage;
