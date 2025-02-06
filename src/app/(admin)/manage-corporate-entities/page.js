// @next
import dynamic from 'next/dynamic';

// @project
const CorporateEntities = dynamic(() => import('@/views/admin/corporate-entity/CorporateEntities'));

/***************************  ACCOUNT  ***************************/

export default function CorporateEntitiesPage() {
  return <CorporateEntities />;
}
