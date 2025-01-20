// @next
import dynamic from 'next/dynamic';

// @project
const UserType = dynamic(() => import('@/views/admin/user-type'));

/***************************  ACCOUNT  ***************************/

export default function UserTypeScreen() {
  return <UserType />;
}
