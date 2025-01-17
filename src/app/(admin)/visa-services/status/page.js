// @next
import dynamic from 'next/dynamic';

// @project
const StatusPage = dynamic(() => import('@/views/admin/visa-services/visaconsultencyFiles/components/Status'));

/***************************  ACCOUNT  ***************************/

export default function Status() {
  return <StatusPage />;
}
