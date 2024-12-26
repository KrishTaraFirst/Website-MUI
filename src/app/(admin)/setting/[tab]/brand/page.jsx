// @next
import dynamic from 'next/dynamic';

// @project
const Brand = dynamic(() => import('@/views/admin/setting/manage-brand'));

/***************************  GENERAL - MANAGE BRAND  ***************************/

// Define the dynamic paths for the `[tab]` parameter
export async function generateStaticParams() {
  // Replace these values with actual dynamic values from your application
  const tabs = ['general', 'profile', 'notifications'];

  return tabs.map((tab) => ({ tab }));
}

export default function GeneralBrand({ params }) {
  return <Brand />;
}
