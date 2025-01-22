// @next
import dynamic from 'next/dynamic';

// @project
const UserDashboard = dynamic(() => import('@/views/admin/dashboard'));

/***************************  ACCOUNT  ***************************/

export default function Invoicings() {
  return <UserDashboard />;
}
