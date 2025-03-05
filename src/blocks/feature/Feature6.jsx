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
import { SECTION_COMMON_PY } from '@/utils/constant';
import NextLink from 'next/link';
import { IconArrowRight } from '@tabler/icons-react';

/***************************  FEATURE - 6  ***************************/

export default function Feature6({ heading, caption, image, features, getStarted }) {
  const theme = useTheme();

  const gc = theme.palette.grey[100];
  const gradient =
    theme.direction === ThemeDirection.RTL
      ? `radial-gradient(100% 100% at 14.27% 46.41%, ${alpha(gc, 0)} 0%, ${alpha(gc, 0.3)} 100%)`
      : `radial-gradient(100% 100% at 14.27% 46.41%, ${alpha(gc, 0)} 0%, ${alpha(gc, 0.6)} 100%)`;

  const imageBoxRadius = { xs: 3, sm: 5 };
  const imageRadius = { borderTopLeftRadius: { xs: 12 }, borderBottomRightRadius: { xs: 24, sm: 32, md: 40 } };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        {/* <motion.div
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.4
          }}
        >
          <Typeset {...{ heading, caption }} />
        </motion.div> */}
        <Grid container spacing={1.5}>
          {image && (
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.4
                }}
              >
                <GraphicsCard sx={{ p: { xs: 2, sm: 5 } }}>
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: 0.4
                    }}
                  >
                    <Stack direction={'row'}>
                      <Typeset {...{ heading, caption }} image={image.src} />
                    </Stack>

                    <Stack sx={{ alignItems: 'center', pt: { xs: 3, sm: 4, md: 6 } }}>
                      <Button
                        variant="contained"
                        size="large"
                        {...getStarted.link}
                        {...(getStarted.link && getStarted.link.href && { component: NextLink })}
                      />
                    </Stack>
                  </motion.div>
                </GraphicsCard>
              </motion.div>
            </Grid>
          )}
          <Grid size={{ xs: 12, md: 6 }}>
            <Grid container spacing={1.5}>
              {features.map((item, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6, md: 6 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: item.animationDelay
                    }}
                  >
                    <ServiceCard
                      icon={item.icon}
                      title={item.title}
                      href={item.href}
                      content={item.content}
                      iconAvatar
                      cardPadding={{ xs: 2, sm: 3, md: 3 }}
                    />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
            <Stack sx={{ alignItems: 'center', pt: { xs: 1, sm: 2, md: 2.5 } }}>
              <Button
                variant="contained"
                size="large"
                href={'/services'}
                {...(getStarted.link && getStarted.link.href && { component: NextLink })}
                endIcon={<IconArrowRight />}
              >
                View More
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

Feature6.propTypes = { heading: PropTypes.string, caption: PropTypes.string, image: PropTypes.any, features: PropTypes.array };
