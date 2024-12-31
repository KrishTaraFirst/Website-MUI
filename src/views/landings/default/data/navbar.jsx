// @project
import { landingMegamenu, pagesMegamenu } from '../../common-data';
import SvgIcon from '@/components/SvgIcon';
import { SECTION_PATH, ADMIN_PATH, BUY_NOW_URL, DOCS_URL, FREEBIES_URL } from '@/path';

/***************************  DEFAULT - NAVBAR  ***************************/

const linkProps = { rel: 'noopener noreferrer' };
// export const navbar = {
//   customization: true,
//   secondaryBtn: {
//     children: <SvgIcon name="tabler-brand-github" color="primary.main" size={18} />,
//     href: FREEBIES_URL,
//     ...linkProps,
//     sx: { minWidth: 40, width: 40, height: 40, p: 0 }
//   },
//   primaryBtn: { children: 'Sign In', href: BUY_NOW_URL, ...linkProps },
//   navItems: [
//     { id: 'home', title: 'Home', link: '/' },
//     { id: 'about', title: 'About', link: '/about' },
//     { id: 'contact', title: 'Contact', link: '/contact' },
//     // landingMegamenu,
//     // { id: 'components', title: 'Blocks', link: SECTION_PATH },
//     pagesMegamenu,
//     { id: 'docs', title: 'Docs', link: DOCS_URL, target: '_blank', rel: 'noopener noreferrer', icon: 'tabler-pin-invoke' }
//   ]
// };

export const navbar = {
  customization: true,
  secondaryBtn: { children: 'Sign Up', href: '/register', rel: 'noopener noreferrer' },
  primaryBtn: { children: 'Login', href: '/login', rel: 'noopener noreferrer' },
  navItems: [
    { id: 'home', title: 'Home', link: '/' },
    { id: 'about', title: 'About', link: '/about' },
    { id: 'contact', title: 'Contact', link: '/contact' },
    // landingMegamenu,
    // { id: 'components', title: 'Blocks', link: SECTION_PATH },
    pagesMegamenu,
    { id: 'docs', title: 'Docs', link: DOCS_URL, target: '_blank', rel: 'noopener noreferrer', icon: 'tabler-pin-invoke' }
  ]
};
