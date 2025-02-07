// @next
import dynamic from 'next/dynamic';

// @project
const Team = dynamic(() => import('@/views/admin/team'));

/***************************  ACCOUNT  ***************************/

export default function ManageTeam() {
  return <Team />;
}
