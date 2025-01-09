import PropTypes from 'prop-types';
// @next
import dynamic from 'next/dynamic';

// @project
const QuickAccess = dynamic(() => import('@/views/admin/visa_services/visaconsultencyFiles/quickAccess'));

export default async function Dashboard({ params }) {
  const { tab } = await params;
  return <QuickAccess tab={tab} />;
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const response = ['pending', 'in_progress', 'completed'];

  return response.map((tab) => ({
    tab: tab
  }));
}

QuickAccess.propTypes = { params: PropTypes.object };
