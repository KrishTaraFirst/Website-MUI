// @project
import { landingMegamenu, pagesMegamenu } from '../../common-data';
import { SECTION_PATH, BUY_NOW_URL, DOCS_URL, FREEBIES_URL } from '@/path';

/***************************  DEFAULT - NAVBAR  ***************************/

export const navbar = {
  customization: true,
  secondaryBtn: { children: 'Sign Up', href: '/register', rel: 'noopener noreferrer' },
  primaryBtn: { children: 'Login', href: '/login', rel: 'noopener noreferrer' },
  navItems: [
    { id: 'services', title: 'Services', link: '/' },
    // { id: 'about', title: 'About', link: '/about' },
    { id: 'products', title: 'Products', link: '/' },
    { id: 'knowledge', title: 'Knowledge', link: '/contact' },
    { id: 'company', title: 'Company', link: '/' },
    { id: 'bookConsultation', title: 'Book Consultation', link: '/' }
    // landingMegamenu,
    // { id: 'components', title: 'Blocks', link: SECTION_PATH },
    // pagesMegamenu,
    // { id: 'docs', title: 'Docs', link: DOCS_URL, rel: 'noopener noreferrer', icon: 'tabler-pin-invoke' }
  ]
};
