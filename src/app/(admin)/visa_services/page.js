// @next
import dynamic from 'next/dynamic';

// @project
const VisaServices = dynamic(() => import('@/views/admin/visa_services'));

/***************************  ACCOUNT  ***************************/

export default function Invoicings() {
  return <VisaServices />;
}
