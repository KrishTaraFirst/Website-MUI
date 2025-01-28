// @next
import dynamic from 'next/dynamic';

// @project
const Payrollsettings = dynamic(() => import('@/views/admin/payroll/Payrollsettings'));

/***************************  ACCOUNT  ***************************/

export default function Invoicings() {
  return <Payrollsettings />;
}
