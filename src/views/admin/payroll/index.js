'use client';
import React, { useState } from 'react';
import Payrollsettings from './Payrollsettings';
import PayrollDashboard from './PayrollDashboard';
function PartollPage() {
  const [PayrollSetup, setPayrollSetup] = useState(false);
  return <div>{PayrollSetup ? <Payrollsettings /> : <PayrollDashboard />}</div>;
}

export default PartollPage;
