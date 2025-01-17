import PropTypes from 'prop-types';
// @next
import dynamic from 'next/dynamic';

// @project
const QuickAccess = dynamic(() => import('@/views/admin/visa-services/visaconsultencyFiles/QuickAccess'));
const ServiceRequest = dynamic(() => import('@/views/admin/visa-services/visaconsultencyFiles/ServiceRequest'));

export default async function Dashboard({ params }) {
  const { tab } = await params;
  return <>{['pending', 'in_progress', 'completed'].includes(tab) ? <QuickAccess tab={tab} /> : <ServiceRequest tab={tab} />}</>;
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const response = [
    'pending',
    'in_progress',
    'completed',
    'create-new',
    'itr',
    'networth',
    'business-proof',
    'loans',
    'visa-fund',
    'forex-payments',
    'insurance',
    'travel-booking',
    'visa-slot',
    'passport-application'
  ];

  return response.map((tab) => ({
    tab: tab
  }));
}

QuickAccess.propTypes = { params: PropTypes.object };
