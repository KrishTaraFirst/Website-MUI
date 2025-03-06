import PropTypes from 'prop-types';
// @next
import dynamic from 'next/dynamic';

// @project
const ServiceCategories = dynamic(() => import('@/views/landings/default/service-category'));

export default async function ServiceCategoriesPage({ params }) {
  const { tab } = await params;
  return <ServiceCategories tab={tab} />;
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const response = [
    'financial-advisory',
    'virtual-cfo',
    'accounting-compliance',
    'business-incorporation',
    'licenses-registrations',
    'gst-services',
    'income-tax-services',
    'roc-compliance',
    'tds',
    'payroll-compliance',
    'loans',
    'insurance'
  ];

  return response.map((tab) => ({
    tab: tab
  }));
}

ServiceCategories.propTypes = { params: PropTypes.object };
