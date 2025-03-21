import React from 'react';
import RenderTable from './RenderTable';

export default function LoansAndAdvances() {
  const headerData = [
    'Employee Name',
    'Department',
    'Designation',
    'Type',
    'Amount',
    'EMI',
    'End Month',
    'Pending Balance',
    'Current Deduction'
  ];
  return <RenderTable headerData={headerData} />;
}
