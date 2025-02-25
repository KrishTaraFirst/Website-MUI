// @next
import dynamic from 'next/dynamic';

// @project
const BusinessProfile = dynamic(() => import('@/views/admin/user-type/businessDetails.js'));

/***************************  ACCOUNT  ***************************/

export default function BusinessProfileScreen() {
  return <BusinessProfile />;
}
