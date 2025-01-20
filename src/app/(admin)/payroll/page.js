// @next
import dynamic from 'next/dynamic';

// @project
const Payroll = dynamic(() => import('@/views/admin/payroll'));

/***************************  ACCOUNT  ***************************/

export default function Invoicings() {
  return <Payroll />;
}
