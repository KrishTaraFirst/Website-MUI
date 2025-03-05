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
import { services } from './data';
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

export default function Services() {
  const iconProps = { type: IconType.CUSTOM };
  const sectionPadding = { xs: 2, sm: 3, md: 5 };
  const cardRadius = { xs: 6, sm: 8 };
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={1.5}>
        {Object.keys(services).map((item, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
            <ServiceCard
              icon={services[item].icon}
              // icon={services[item].icon}
              title={services[item].title}
              href={'services/' + item}
              content={services[item].shortDesc}
              iconAvatar
              cardPadding={{ xs: 2, sm: 3, md: 3 }}
              height={200}
            />
          </Grid>
        ))}
      </Grid>
    </ContainerWrapper>
  );
}
