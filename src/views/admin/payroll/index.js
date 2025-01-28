'use client';
import React, { useState } from 'react';
import Payrollsettings from './Payrollsettings';
import PayrollDashboard from './PayrollDashboard';
function PayrollPage() {
  const [PayrollSetup, setPayrollSetup] = useState(true);
  return <div>{PayrollSetup ? <Payrollsettings /> : <PayrollDashboard />}</div>;
}

export default PayrollPage;
