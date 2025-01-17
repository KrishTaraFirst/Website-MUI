// @next
import dynamic from 'next/dynamic';

// @project
const VisaServices = dynamic(() => import('@/views/admin/visa-services'));

/***************************  ACCOUNT  ***************************/

export default function Invoicings() {
  return <VisaServices />;
}
