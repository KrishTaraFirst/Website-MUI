import { Cta5 } from '@/blocks/cta';
import { ContactUs4 } from '@/blocks/contact-us';

// @data
import { cta5, contactUS } from './data';

/***************************  PAGE - CONTACT  ***************************/

export default function Service({ tab }) {
  return (
    <>
      <ContactUs4 {...contactUS} />
    </>
  );
}
