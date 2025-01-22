import PropTypes from 'prop-types';
// @next
import dynamic from 'next/dynamic';

// @project
const UsersPage = dynamic(() => import('@/views/admin/dashboard/users.jsx'));

export default async function UsersDataPage({ params }) {
  const { tab } = await params;
  return <UsersPage tab={tab} />;
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const response = ['individual', 'ca-firms', 'service-providers', 'corporate-entities'];

  return response.map((tab) => ({
    tab: tab
  }));
}

UsersPage.propTypes = { params: PropTypes.object };
