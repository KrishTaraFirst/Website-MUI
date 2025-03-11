'use client';
import PropTypes from 'prop-types';

// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// @third-party
import { motion } from 'framer-motion';

// @project
import GraphicsCard from '@/components/cards/GraphicsCard';
import ServiceCard from '@/components/cards/ServiceCard';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import Typeset from '@/components/Typeset3';
import { ThemeDirection } from '@/config';
import IconCard from '@/components/cards/IconCard';
import { IconType } from '@/enum';
import { SECTION_COMMON_PY } from '@/utils/constant';
import NextLink from 'next/link';
import { Cta1 } from '@/blocks/cta';
import { categoryServices } from './data/services';
import React from 'react';

export default function ServiceCategories({ tab }) {
  const iconProps = { type: IconType.CUSTOM };
  const sectionPadding = { xs: 2, sm: 3, md: 5 };
  const cardRadius = { xs: 6, sm: 8 };

  const cta = {
    bgImage: '/assets/images/graphics/ai/background1.svg',
    heading: categoryServices[tab].title,
    captionLine: categoryServices[tab].description
  };

  let services = categoryServices[tab].services;
  let servicesArr = Object.keys(services);

  return (
    <>
      <Cta1 {...cta} search={true} />
      <ContainerWrapper sx={{ py: { xs: 0, sm: 0, md: 0 } }}>
        <Grid container spacing={1.5}>
          {servicesArr.map((item, index) => (
            <React.Fragment key={index}>
              {services[item]['sub-services'] ? (
                <>
                  {Object.keys(services[item]['sub-services']).map((subItem, subIndex) => (
                    <Grid key={subIndex + 'subIndex'} size={{ xs: 12, sm: 6, md: 4 }}>
                      <ServiceCard
                        // icon={'tabler-credit-card-pay'}
                        // icon={services[item].icon}
                        title={services[item]['sub-services'][subItem].title}
                        href={`/services/${subItem}`}
                        content={services[item]['sub-services'][subItem].description}
                        iconAvatar
                        cardPadding={{ xs: 2, sm: 3, md: 3 }}
                        height={200}
                      />
                    </Grid>
                  ))}
                </>
              ) : (
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <ServiceCard
                    // icon={'tabler-credit-card-pay'}
                    // icon={services[item].icon}
                    title={services[item].title}
                    href={`/services/${item}`}
                    content={services[item].description}
                    iconAvatar
                    cardPadding={{ xs: 2, sm: 3, md: 3 }}
                    height={200}
                  />
                </Grid>
              )}
            </React.Fragment>
          ))}
        </Grid>
      </ContainerWrapper>
    </>
  );
}
