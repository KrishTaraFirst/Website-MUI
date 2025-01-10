'use client';
import PropTypes from 'prop-types';

// @next
import NextLink from 'next/link';

// @mui
import Grid from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';

// @project
import GraphicsCard from '@/components/cards/GraphicsCard';
import ProfileCard2 from '@/components/cards/profile-card/ProfileCard2';
import ContainerWrapper from '@/components/ContainerWrapper';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset2';
import { SECTION_COMMON_PY } from '@/utils/constant';
import { Typography } from '@mui/material';

// @types

/***************************  BLOG - 3  ***************************/

export default function Blog3({ heading, caption, blogs }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: 2.5 }}>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.4
          }}
        >
          <Typeset {...{ heading, caption }} />
        </motion.div>
        <Grid container spacing={1.5}>
          {blogs.map((item, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6 }}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: item.animationDelay
                }}
              >
                <GraphicsCard>
                  <GraphicsCard bgImage={item.image} sx={{ height: { xs: 250, md: 326 } }} />
                  <Box sx={{ padding: { xs: 2.5, sm: 3, md: 4 } }}>
                    <Stack sx={{ gap: 2.5, alignItems: 'flex-start' }}>
                      <Stack
                        direction="row"
                        sx={{
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          '&:hover .MuiLink-root, &:hover svg': { color: 'primary.dark' }
                        }}
                      >
                        <Link component={NextLink} variant="h3" color="text.primary" {...item.link}>
                          {item.heading}
                        </Link>
                        {item.link && (
                          <Link component={NextLink} {...item.link} rel="noopener noreferrer" aria-label="blog-link">
                            <SvgIcon name="tabler-arrow-up-right" size={40} color="text.primary" stroke={1} />
                          </Link>
                        )}
                      </Stack>
                      {caption && (
                        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                          {caption}
                        </Typography>
                      )}
                      {item.profile && <ProfileCard2 {...item.profile} />}
                    </Stack>
                  </Box>
                </GraphicsCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

Blog3.propTypes = { heading: PropTypes.any, caption: PropTypes.any, blogs: PropTypes.any };
