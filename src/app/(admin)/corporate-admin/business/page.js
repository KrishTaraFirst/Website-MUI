// @next
import dynamic from 'next/dynamic';

// @project
const BusinessList = dynamic(() => import('@/views/admin/dashboard/corporateAdminComponenets/BusinessList'));

/***************************  ACCOUNT  ***************************/

export default function Invoicings() {
  return <BusinessList />;
}
