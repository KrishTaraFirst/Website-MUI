// @project
import { PAGE_PATH, SECTION_PATH } from '@/path';

// @asssets
const imagePrefix = '/assets/images/presentation';

// @project
import branding from '@/branding.json';

export const other = {
  heading: `${branding.brandName} Blocks `,
  description: 'Explore a wide range of ready-made blocks—from Hero to CTA, Features, and more to speed up your design process.',
  primaryBtn: { children: 'Explore all Blocks', href: SECTION_PATH },
  sections: [
    {
      animationDelay: 0.2,
      title: 'Hero',
      subTitle: '17 Different Variants',
      image: { light: `${imagePrefix}/hero-light.svg`, dark: `${imagePrefix}/hero-dark.svg` },
      link: PAGE_PATH.hero
    },
    {
      animationDelay: 0.3,
      title: 'Call to Action',
      subTitle: '12 Different Variants',
      image: { light: `${imagePrefix}/cta-light.svg`, dark: `${imagePrefix}/cta-dark.svg` },
      link: PAGE_PATH.cta
    },
    {
      animationDelay: 0.4,
      title: 'Feature',
      subTitle: '23 Different Variants',
      image: { light: `${imagePrefix}/feature-light.svg`, dark: `${imagePrefix}/feature-dark.svg` },
      link: PAGE_PATH.feature
    },
    {
      animationDelay: 0.2,
      title: 'Benefits',
      subTitle: '9 Different Variants',
      image: { light: `${imagePrefix}/benefits-light.svg`, dark: `${imagePrefix}/benefits-dark.svg` },
      link: PAGE_PATH.benefit
    },
    {
      animationDelay: 0.3,
      title: 'Process',
      subTitle: '7 Different Variants',
      image: { light: `${imagePrefix}/process-light.svg`, dark: `${imagePrefix}/process-dark.svg` },
      link: PAGE_PATH.process
    },
    {
      animationDelay: 0.4,
      title: 'Integration',
      subTitle: '8 Different Variants',
      image: { light: `${imagePrefix}/integration-light.svg`, dark: `${imagePrefix}/integration-dark.svg` },
      link: PAGE_PATH.integration
    }
  ]
};

export const other3 = {
  heading: 'Join a Winning Team',
  caption: 'Be a part of a winning culture that fosters collaboration, creativity, and success in every career path',
  other: [
    {
      title: 'Product Design',
      description: 'We’re looking for a mid-level product designer to join our team.',
      chips: [
        {
          icon: 'tabler-map-pin',
          name: 'Remote'
        },
        {
          icon: 'tabler-history',
          name: 'Full-Time'
        }
      ],
      btn: { children: 'View Job', href: '#' }
    },
    {
      title: 'Front-End Developer',
      description: 'We’re looking for a mid-level product designer to join our team.',
      chips: [
        {
          icon: 'tabler-map-pin',
          name: 'Remote'
        },
        {
          icon: 'tabler-history',
          name: 'Full-Time'
        }
      ],
      btn: { children: 'View Job', href: '#' }
    },
    {
      title: 'Back-End Developer',
      description: 'We’re looking for a mid-level product designer to join our team.',
      chips: [
        {
          icon: 'tabler-map-pin',
          name: 'Remote'
        },
        {
          icon: 'tabler-history',
          name: 'Full-Time'
        }
      ],
      btn: { children: 'View Job', href: '#' }
    },
    {
      title: 'Scrum Master',
      description: 'We’re looking for a mid-level product designer to join our team.',
      chips: [
        {
          icon: 'tabler-map-pin',
          name: 'Remote'
        },
        {
          icon: 'tabler-history',
          name: 'Full-Time'
        }
      ],
      btn: { children: 'View Job', href: '#' }
    }
  ]
};
