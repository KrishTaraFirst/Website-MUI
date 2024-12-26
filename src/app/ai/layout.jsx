import PropTypes from 'prop-types';
// @next
import dynamic from 'next/dynamic';

// @types

// @project
const ScrollFab = dynamic(() => import('@/components/ScrollFab'));
const AILayout = dynamic(() => import('@/views/landings/ai/layout'));

/***************************  LAYOUT - AI  ***************************/

export default function AI({ children }) {
  return (
    <AILayout>
      <>
        {children}

        {/* scroll to top section */}
        <ScrollFab />
      </>
    </AILayout>
  );
}

AI.propTypes = { children: PropTypes.any };
