// @next
import dynamic from 'next/dynamic';

// @project
const Invoicing = dynamic(() => import('@/views/admin/invoicing'));

/***************************  ACCOUNT  ***************************/

export default function Invoicings() {
  return <Invoicing />;
}
