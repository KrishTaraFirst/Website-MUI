// @project
import { BUY_NOW_URL, FREEBIES_URL } from '@/path';

export const hero = {
  chip: {
    label: 'New Beta Version is Release ',
    link: { children: 'explore now', href: BUY_NOW_URL, target: '_blank', rel: 'noopener noreferrer' }
  },
  headLine: 'AI ❖ Assistant for Smarter Development',
  captionLine: 'Navigate effortlessly with an AI assistant, a comprehensive software catalog, and custom training.',
  image: { light: '/assets/images/graphics/ai/desktop2-light.svg', dark: '/assets/images/graphics/ai/desktop2-dark.svg' },
  primaryBtn: { children: 'Get Started - It’s Free Now', href: FREEBIES_URL, target: '_blank', rel: 'noopener noreferrer' }
};
