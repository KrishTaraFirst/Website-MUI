'use client';
import { useRouter } from 'next/navigation';

// @mui
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// @third-party
import Typeset from '@/components/Typeset2';

// @project
import GraphicsCard from '@/components/cards/GraphicsCard';
import ContainerWrapper from '@/components/ContainerWrapper';
import { SECTION_COMMON_PY } from '@/utils/constant';
// @data
import { servicesData } from './data/services';

/***************************  PAGE - CONTACT  ***************************/

export default function Service({ tab }) {
  const router = useRouter();

  const sectionPadding = { xs: 2, sm: 2, md: 3 };
  const cardRadius = { xs: 6, sm: 8 };
  return (
    <>
      <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
        <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
          <Grid container spacing={1.5}>
            <Grid size={12}>
              <Grid size={12}></Grid>
              <GraphicsCard sx={{ height: 1, borderRadius: cardRadius }}>
                <GraphicsCard sx={{ bgcolor: 'grey.200', borderRadius: cardRadius, p: 2, px: 4 }}>
                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Stack sx={{ justifyContent: 'center' }}>
                      <Typography variant="h3">{servicesData[tab].title}</Typography>
                    </Stack>
                    <Stack direction="row" sx={{ gap: 1.5 }}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          router.push(`/business-registration?service=${tab}`);
                        }}
                      >
                        Get Stared Now
                      </Button>
                      <Button
                        onClick={() => {
                          router.push(`/book-consultation`);
                        }}
                        variant="contained"
                      >
                        Talk to Expert
                      </Button>
                    </Stack>
                  </Stack>
                </GraphicsCard>
                <Box sx={{ p: sectionPadding, px: { md: 4 } }}>
                  <Typography variant="h6">{servicesData[tab].description}</Typography>
                </Box>
              </GraphicsCard>
            </Grid>

            {servicesData[tab].offerings?.map((item, index) => (
              <Grid key={index} size={{ xs: 12, sm: 4 }}>
                <GraphicsCard sx={{ height: 1 }}>
                  <Stack
                    direction={{ xs: 'row', sm: 'column' }}
                    sx={{ gap: { xs: 2, sm: 4, md: 5 }, height: 1, p: { xs: 2, sm: 3, md: 4 } }}
                  >
                    <Stack sx={{ gap: { xs: 2, md: 3 }, height: 1, alignItems: 'flex-start', justifyContent: 'space-between' }}>
                      <Typeset
                        {...{
                          heading: item.name,
                          caption: item.details,
                          stackProps: { sx: { gap: 1 } },
                          headingProps: { variant: 'h4' },
                          captionProps: { variant: 'body1' }
                        }}
                      />
                    </Stack>
                  </Stack>
                </GraphicsCard>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </ContainerWrapper>
    </>
  );
}
