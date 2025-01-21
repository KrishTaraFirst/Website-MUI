// @next
import dynamic from 'next/dynamic';

// @project
const ManageAccessPage = dynamic(() => import('@/views/admin/manage-access'));

/***************************  ACCOUNT  ***************************/

export default function ManageAccess() {
  return <ManageAccessPage />;
}
