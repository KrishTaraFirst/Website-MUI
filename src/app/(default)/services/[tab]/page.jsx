import PropTypes from 'prop-types';
// @next
import dynamic from 'next/dynamic';

// @project
const Service = dynamic(() => import('@/views/landings/default/service'));

export default async function ServicePage({ params }) {
  const { tab } = await params;
  return <Service tab={tab} />;
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const response = [
    'payroll',
    'invoicing',
    'doc-wallet',
    'virtual-cfo',
    'financial-modelling',
    'due-diligence',
    'fix-books',
    'internal-audit',
    'company-registration',
    'accounting-bookkeeping',
    'gst-registration',
    'fhi-score'
  ];

  return response.map((tab) => ({
    tab: tab
  }));
}

Service.propTypes = { params: PropTypes.object };
