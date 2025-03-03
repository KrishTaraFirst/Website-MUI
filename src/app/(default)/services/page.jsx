import dynamic from 'next/dynamic';

// @project

const Service = dynamic(() => import('@/views/landings/default/services'));

/***************************  METADATA - PRICING  ***************************/

/***************************  PAGE - PRICING  ***************************/

export default function ServicePage() {
  return <Service />;
}
