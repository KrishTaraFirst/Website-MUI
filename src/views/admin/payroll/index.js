'use client';
import React, { useState } from 'react';
import Payrollsettings from './Payrollsettings';
import PayrollDashboard from './PayrollDashboard';
function index() {
  const [PayrollSetup, setPayrollSetup] = useState(false);
  return <div>{PayrollSetup ? <Payrollsettings /> : <PayrollDashboard />}</div>;
}

export default index;
