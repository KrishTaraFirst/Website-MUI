// @project
import branding from '@/branding.json';
import { BUY_NOW_URL } from '@/path';

const linkProps = { rel: 'noopener noreferrer' };

export const smallHero = {
  chip: {
    label: 'New Beta Version is Release ',
    link: { children: 'explore now', href: BUY_NOW_URL, ...linkProps }
  },
  captionLine: `This Privacy Policy describes how ${branding.brandName} we collects, uses, and shares information about you when you use our website or services.`,
  headLine: 'Privacy Policy',
  exploreBtn: { children: 'Contact Us', href: '/contact' }
};

export const smallHero1 = {
  chip: {
    label: 'New Beta Version is Release ',
    link: { children: 'explore now', href: BUY_NOW_URL, ...linkProps }
  },
  captionLine: `This Privacy Policy describes how ${branding.brandName} we collects, uses, and shares information about you when you use our website or services.`,
  headLine: 'Terms and Condition',
  exploreBtn: { children: 'Contact Us', href: '/contact' }
};

export const smallHero4 = {
  chip: {
    label: 'New Beta Version is Release ',
    link: { children: 'explore now', href: BUY_NOW_URL, ...linkProps }
  },
  heading: `Build Your Future with ✦ ${branding.brandName}`,
  caption: 'Embark on a rewarding journey with us. Find opportunities to grow, learn and make a lasting impact.',
  exploreBtn: { children: 'See Open Position', href: '#' },
  image: { light: '/assets/images/graphics/ai/desktop1-light.svg', dark: '/assets/images/graphics/ai/desktop1-dark.svg' }
};
