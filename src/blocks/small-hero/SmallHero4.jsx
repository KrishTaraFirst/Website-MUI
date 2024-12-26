import PropTypes from 'prop-types';
// @next
import NextLink from 'next/link';

// @mui
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import GraphicsCard  from '@/components/cards/GraphicsCard';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  SMALL HERO - 4  ***************************/

export default function SmallHero4({ chip, heading, caption, exploreBtn, image }) {
  const boxPadding = { xs: 3, sm: 4, md: 5 };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Grid container spacing={{ xs: 3, sm: 2.25, md: 3 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ alignItems: 'flex-start', justifyContent: 'space-between', gap: { xs: 3 }, height: 1 }}>
            <Stack sx={{ alignItems: 'start', gap: { xs: 2, sm: 3 } }}>
              {chip && (
                <Chip
                  label={
                    typeof chip.label === 'string' ? (
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {chip.label}
                        {chip.link && (
                          <Link
                            component={NextLink}
                            variant="caption"
                            color="primary.main"
                            {...chip.link}
                            underline="hover"
                            sx={{ '&:hover': { color: 'primary.dark' } }}
                          />
                        )}
                      </Typography>
                    ) : (
                      chip.label
                    )
                  }
                  sx={{ bgcolor: 'grey.100' }}
                />
              )}
              <Typeset {...{ heading, caption, stackProps: { sx: { gap: 1.5 } }, headingProps: { variant: 'h1' } }} />
            </Stack>
            {exploreBtn && <Button color="primary" size="large" variant="contained" {...exploreBtn} />}
          </Stack>
        </Grid>
        {image && (
          <Grid size={{ xs: 12, sm: 6 }}>
            <GraphicsCard>
              <Box sx={{ pl: boxPadding, pt: boxPadding, height: 1 }}>
                <GraphicsImage
                  image={image}
                  sx={{
                    height: { xs: 253, sm: 375, md: 452 },
                    backgroundPositionX: 'left',
                    backgroundPositionY: 'top',
                    borderTopLeftRadius: { xs: 12 }
                  }}
                />
              </Box>
            </GraphicsCard>
          </Grid>
        )}
      </Grid>
    </ContainerWrapper>
  );
}

SmallHero4.propTypes = {
  chip: PropTypes.any,
  heading: PropTypes.string,
  caption: PropTypes.string,
  exploreBtn: PropTypes.any,
  image: PropTypes.any
};
