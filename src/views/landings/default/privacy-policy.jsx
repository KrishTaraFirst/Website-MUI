// @project
import PrivacyPolicyPage from '@/blocks/PrivacyPolicy';
import { SmallHero3 } from '@/blocks/small-hero';

// @data
import { smallHero } from './data';

/***************************  PAGE - PRIVACY POLICY  ***************************/

export default function PrivacyPolicy() {
  return (
    <>
      <SmallHero3 {...smallHero} />
      <PrivacyPolicyPage />
    </>
  );
}
