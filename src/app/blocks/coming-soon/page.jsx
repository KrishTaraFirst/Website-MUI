// @project
import ComingSoon from '@/blocks/ComingSoon';
import { SEO_CONTENT } from '@/metadata';

/***************************  METADATA - COMING SOON  ***************************/

export const metadata = { ...SEO_CONTENT.comingSoonPage };

/***************************  COMING SOON - DATA  ***************************/

const data = {
  chip: { chipCaption: '✦ Stay Tuned ✦ ' },
  description: 'A seamless ecosystem for managing your businesses & personal finances.',
  primaryBtn: { children: 'Notify Me' }
};

/***************************  BLOCK - COMING SOON  ***************************/

export default function BlockComingSoon() {
  return <ComingSoon {...data} />;
}
