// @next
import dynamic from 'next/dynamic';

// @project
const Individual = dynamic(() => import('@/views/admin/individual'));

/***************************  ACCOUNT  ***************************/

export default function IndividualPage() {
  return <Individual />;
}
