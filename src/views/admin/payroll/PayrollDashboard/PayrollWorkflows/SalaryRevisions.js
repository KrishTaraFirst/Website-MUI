import React from 'react';
import RenderTable from './RenderTable';

function SalaryRevisions() {
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

export default SalaryRevisions;
