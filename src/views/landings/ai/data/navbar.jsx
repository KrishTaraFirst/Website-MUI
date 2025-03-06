// @project
import { landingMegamenu, servicesMegamenu } from '../../common-data';
import { SECTION_PATH, BUY_NOW_URL, DOCS_URL, FREEBIES_URL } from '@/path';

/***************************  DEFAULT - NAVBAR  ***************************/

export const navbar = {
  customization: true,
  secondaryBtn: { children: 'Sign Up', href: '/register', rel: 'noopener noreferrer' },
  primaryBtn: { children: 'Login', href: '/login', rel: 'noopener noreferrer' },
  navItems: [
    // { id: 'home', title: 'Home', link: '/' },
    servicesMegamenu,
    // { id: 'services', title: 'Services', link: '/services' },
    { id: 'products', title: 'Products', link: '/products' },
    { id: 'knowledge', title: 'Knowledge', link: '/knowledge' },
    { id: 'about', title: 'Our Company', link: '/about' },
    // { id: 'company', title: 'Company', link: '/company' },
    { id: 'bookConsultation', title: 'Book Consultation', link: '/book-consultation' }
    // landingMegamenu,
    // { id: 'components', title: 'Blocks', link: SECTION_PATH },
    // { id: 'docs', title: 'Docs', link: DOCS_URL, rel: 'noopener noreferrer', icon: 'tabler-pin-invoke' }
  ]
};
