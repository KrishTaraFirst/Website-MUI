// @next
import dynamic from 'next/dynamic';

// @project
const UserDashboard = dynamic(() => import('@/views/admin/dashboard/user'));

/***************************  ACCOUNT  ***************************/

export default function Invoicings() {
  return <UserDashboard />;
}
