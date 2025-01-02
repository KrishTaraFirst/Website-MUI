// @next
import dynamic from 'next/dynamic';

// @project
const Settings = dynamic(() => import('@/views/admin/invoicing/settings'));

/***************************  ACCOUNT  ***************************/

export default function Invoicings() {
  return <Settings />;
}
