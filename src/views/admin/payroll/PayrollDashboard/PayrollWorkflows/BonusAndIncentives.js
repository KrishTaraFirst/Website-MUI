import React from 'react';
import RenderTable from './RenderTable';

function BonusAndIncentives() {
  const headerData = ['Employee Name', 'Department', 'Designation', 'Type', 'Amount'];
  return <RenderTable headerData={headerData} />;
}

export default BonusAndIncentives;
