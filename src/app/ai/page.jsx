// @next
import dynamic from 'next/dynamic';

// @project
const AI = dynamic(() => import('@/views/landings/ai'));

/***************************  PAGE - AI  ***************************/

export default function AIPage() {
  return <AI />;
}
