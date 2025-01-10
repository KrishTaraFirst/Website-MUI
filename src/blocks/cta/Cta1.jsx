'use client';
import PropTypes from 'prop-types';

// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsCard from '@/components/cards/GraphicsCard';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  CALL TO ACTION - 1  ***************************/

export default function Cta1({ bgImage, heading, captionLine }) {
  const theme = useTheme();

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.4,
          delay: 0.4
        }}
      >
        <GraphicsCard
          {...(bgImage && {
            sx: {
              position: 'relative',
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              '&:before': {
                content: `' '`,
                position: 'absolute',
                width: 1,
                height: 1,
                left: 0,
                bottom: 0,
                background: `linear-gradient(180deg, ${alpha(theme.palette.grey[100], 0)} -280%, ${theme.palette.grey[100]} 143.54%)`
              }
            }
          })}
        >
          <Box sx={{ p: { xs: 3, sm: 4, md: 5 }, position: 'relative', width: 1 }}>
            <Stack sx={{ alignItems: 'center', justifyContent: 'center', gap: { xs: 3, sm: 4 } }}>
              <Typography variant="h2" align="center">
                {heading}
              </Typography>
              {captionLine && (
                <Typography variant="h6" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                  {captionLine}
                </Typography>
              )}
            </Stack>
          </Box>
        </GraphicsCard>
      </motion.div>
    </ContainerWrapper>
  );
}

Cta1.propTypes = { bgImage: PropTypes.any, heading: PropTypes.string, primaryBtn: PropTypes.any };
