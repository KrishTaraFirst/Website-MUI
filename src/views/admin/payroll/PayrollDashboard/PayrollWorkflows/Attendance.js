import React from 'react';
import RenderTable from './RenderTable';

export default function Attendance() {
  const headerData = [
    'Employee Name',
    'LOP',
    'Absent',
    'Paid Leaves',
    'Week Offs',
    'Holidays',
    'OT',
    'Total Days',
    'Present Days',
    'Payable Days'
  ];
  return <RenderTable headerData={headerData} />;
}
