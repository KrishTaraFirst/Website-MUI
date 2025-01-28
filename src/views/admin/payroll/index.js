'use client';
import React, { useState } from 'react';
import Payrollsettings from './Payrollsettings';
import PayrollDashboard from './PayrollDashboard';
function PayrollPage() {
  const [PayrollSetup, setPayrollSetup] = useState(false);
  return <div>{PayrollSetup ? <Payrollsettings /> : <PayrollDashboard setPayrollSetup={setPayrollSetup} />}</div>;
}

export default PayrollPage;
