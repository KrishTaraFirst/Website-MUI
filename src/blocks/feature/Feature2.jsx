import PropTypes from 'prop-types';
// @mui
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import IconCard from '@/components/cards/IconCard';
import GraphicsCard from '@/components/cards/GraphicsCard';
import GraphicsImage from '@/components/GraphicsImage';
import Typeset from '@/components/Typeset';

import { IconType } from '@/enum';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  FEATURE - 2  ***************************/

export default function Feature2({ heading, caption, image, features }) {
  const imgBoxPadding = { xs: 3, sm: 5, md: 8 };
  const iconProps = { type: IconType.CUSTOM };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <Typeset {...{ heading, caption }} />
        <Grid container spacing={1.5}>
          {image && (
            <Grid size={12}>
              <GraphicsCard sx={{ pl: imgBoxPadding, pr: { xs: 0, md: 8 }, pt: imgBoxPadding, height: 300 }}>
                <GraphicsImage
                  image={image}
                  sx={{
                    height: 1,
                    backgroundPositionX: 'left',
                    backgroundPositionY: 'top',
                    borderTopLeftRadius: { xs: 12, sm: 16, md: 20 },
                    borderTopRightRadius: { xs: 0, md: 20 }
                  }}
                />
              </GraphicsCard>
            </Grid>
          )}
          {features?.length &&
            features.map((item, index) => (
              <Grid key={index} size={{ xs: 12, sm: 4 }}>
                <IconCard
                  icon={{ ...(typeof item.icon === 'string' ? { name: item.icon, ...iconProps } : { ...iconProps, ...item.icon }) }}
                  title={item.title}
                  content={item.content}
                />
              </Grid>
            ))}
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

Feature2.propTypes = { heading: PropTypes.string, caption: PropTypes.string, image: PropTypes.any, features: PropTypes.array };
