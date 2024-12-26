'use client';
import PropTypes from 'prop-types';

// @mui
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsCard from '@/components/cards/GraphicsCard';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  OTHER - 3  ***************************/

export default function Other3({ heading, caption, other }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <Typeset
          {...{
            heading,
            caption,
            stackProps: { sx: { alignItems: 'center', textAlign: 'center' } },
            captionProps: { sx: { maxWidth: 650 } }
          }}
        />
        <Stack sx={{ gap: 1.5, alignItems: 'center', mx: { md: 14 } }}>
          {other.map((item, index) => (
            <GraphicsCard key={index} sx={{ width: 1, p: { xs: 2, md: 3 }, borderRadius: { xs: 4, sm: 6 } }}>
              <Stack
                direction={{ sm: 'row' }}
                sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 1.5 }}
              >
                <Stack sx={{ gap: { xs: 0.5, sm: 1, md: 1.5 } }}>
                  <Stack direction={{ xs: 'column-reverse', sm: 'row' }} sx={{ gap: 1.5, alignItems: { xs: 'flex-start', sm: 'center' } }}>
                    <Typography variant="h4">{item.title}</Typography>
                    <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                      {item.chips.map((chip, index) => (
                        <Chip
                          size="small"
                          key={index}
                          icon={<SvgIcon name={chip.icon} color="text.secondary" size={20} />}
                          label={
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {chip.name}
                            </Typography>
                          }
                          sx={{ bgcolor: 'grey.300', height: 32, py: 0.5, px: 1.25, borderRadius: 8, '& .MuiChip-label': { pl: 1, pr: 1 } }}
                        />
                      ))}
                    </Stack>
                  </Stack>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {item.description}
                  </Typography>
                </Stack>
                <Button color="primary" variant="outlined" {...item.btn} />
              </Stack>
            </GraphicsCard>
          ))}
        </Stack>
      </Stack>
    </ContainerWrapper>
  );
}

Other3.propTypes = { heading: PropTypes.string, caption: PropTypes.string, other: PropTypes.array };
