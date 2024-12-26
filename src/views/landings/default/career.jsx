'use client';

// @project
import Feature2 from '@/blocks/feature/Feature2';
import SmallHero4 from '@/blocks/small-hero/SmallHero4';
import LazySection from '@/components/LazySection';
import useDataThemeMode from '@/hooks/useDataThemeMode';

// @data
import { cta10, feature5, feature2, smallHero4, other3 } from './data';

/***************************  PAGE - CAREER  ***************************/

export default function Career() {
  useDataThemeMode();

  return (
    <>
      <SmallHero4 {...smallHero4} />
      <Feature2 {...feature2} />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature5 })), props: feature5 },
          { importFunc: () => import('@/blocks/other').then((module) => ({ default: module.Other3 })), props: other3 },
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta10 })), props: cta10 }
        ]}
        offset="200px"
      />
    </>
  );
}
