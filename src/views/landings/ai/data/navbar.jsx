// @project
import { landingMegamenu, pagesMegamenu } from '../../common-data';
import { SECTION_PATH, BUY_NOW_URL, DOCS_URL, FREEBIES_URL } from '@/path';

/***************************  DEFAULT - NAVBAR  ***************************/

export const navbar = {
  customization: true,
  secondaryBtn: { children: 'Sign Up', href: '/register', rel: 'noopener noreferrer' },
  primaryBtn: { children: 'Login', href: '/login', rel: 'noopener noreferrer' },
  navItems: [
    { id: 'services', title: 'Services', link: '/services' },
    // { id: 'about', title: 'About', link: '/about' },
    { id: 'products', title: 'Products', link: '/products' },
    { id: 'knowledge', title: 'Knowledge', link: '/knowledge' },
    { id: 'company', title: 'Company', link: '/company' },
    { id: 'bookConsultation', title: 'Book Consultation', link: '/book-consultation' }
    // landingMegamenu,
    // { id: 'components', title: 'Blocks', link: SECTION_PATH },
    // pagesMegamenu,
    // { id: 'docs', title: 'Docs', link: DOCS_URL, rel: 'noopener noreferrer', icon: 'tabler-pin-invoke' }
  ]
};
