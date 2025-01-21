'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box, Card, Stack, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import PresentationCard from '@/components/cards/PresentationCard';

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  border: `0px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&::before': {
    display: 'none'
  }
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .05)',
  flexDirection: 'row-reverse',
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
    transform: 'rotate(90deg)'
  },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1)
  },
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(255, 255, 255, .05)'
  })
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(4),
  borderTop: '1px solid rgba(0, 0, 0, .125)'
}));

export default function ManageAccess() {
  const [expanded, setExpanded] = React.useState('caFirm');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box>
      <Stack direction="column" sx={{ gap: 0.5, mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 400 }}>
          Manage Access
        </Typography>
        <Typography variant="caption" sx={{ color: 'grey.700' }}>
          Tagline for manage access
        </Typography>
      </Stack>
      <Card sx={{ borderRadius: 2, border: '1px solid #dfdfdf' }}>
        <Accordion expanded={expanded === 'caFirm'} onChange={handleChange('caFirm')}>
          <AccordionSummary aria-controls="caFirmd-content" id="caFirmd-header">
            <Typography component="span">CA Frim Admin</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack direction="row" sx={{ alignItems: 'flex-start', gap: 2.5, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
              <FormGroup sx={{ gap: 2.5 }}>
                <FormControlLabel
                  control={<Checkbox size="small" sx={{ mt: -1 }} />}
                  label={
                    <Stack sx={{ gap: 0.5 }}>
                      <Typography variant="subtitle2">Title will goes here</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Choose the content you want to view.
                      </Typography>
                    </Stack>
                  }
                  sx={{ alignItems: 'flex-start' }}
                />
                <FormControlLabel
                  control={<Checkbox size="small" defaultChecked sx={{ mt: -1 }} />}
                  label={
                    <Stack sx={{ gap: 0.5 }}>
                      <Typography variant="subtitle2">Title will goes here</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Choose the content you want to view.
                      </Typography>
                    </Stack>
                  }
                  sx={{ alignItems: 'flex-start' }}
                />
                <FormControlLabel
                  control={<Checkbox size="small" indeterminate sx={{ mt: -1 }} />}
                  label={
                    <Stack sx={{ gap: 0.5 }}>
                      <Typography variant="subtitle2">Title will goes here</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Choose the content you want to view.
                      </Typography>
                    </Stack>
                  }
                  sx={{ alignItems: 'flex-start' }}
                />
              </FormGroup>
              <FormGroup sx={{ gap: 2.5 }}>
                <FormControlLabel
                  control={<Checkbox sx={{ mt: -1 }} />}
                  label={
                    <Stack sx={{ gap: 0.5 }}>
                      <Typography variant="subtitle2">Title will goes here</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Choose the content you want to view.
                      </Typography>
                    </Stack>
                  }
                  sx={{ alignItems: 'flex-start' }}
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked sx={{ mt: -1 }} />}
                  label={
                    <Stack sx={{ gap: 0.5 }}>
                      <Typography variant="subtitle2">Title will goes here</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Choose the content you want to view.
                      </Typography>
                    </Stack>
                  }
                  sx={{ alignItems: 'flex-start' }}
                />
                <FormControlLabel
                  control={<Checkbox indeterminate sx={{ mt: -1 }} />}
                  label={
                    <Stack sx={{ gap: 0.5 }}>
                      <Typography variant="subtitle2">Title will goes here</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Choose the content you want to view.
                      </Typography>
                    </Stack>
                  }
                  sx={{ alignItems: 'flex-start' }}
                />
              </FormGroup>
              <FormGroup sx={{ gap: 2.5 }}>
                <FormControlLabel
                  control={<Checkbox size="large" sx={{ mt: -1 }} />}
                  label={
                    <Stack sx={{ gap: 0.5 }}>
                      <Typography variant="subtitle2">Title will goes here</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Choose the content you want to view.
                      </Typography>
                    </Stack>
                  }
                  sx={{ alignItems: 'flex-start' }}
                />
                <FormControlLabel
                  control={<Checkbox size="large" defaultChecked sx={{ mt: -1 }} />}
                  label={
                    <Stack sx={{ gap: 0.5 }}>
                      <Typography variant="subtitle2">Title will goes here</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Choose the content you want to view.
                      </Typography>
                    </Stack>
                  }
                  sx={{ alignItems: 'flex-start' }}
                />
                <FormControlLabel
                  control={<Checkbox size="large" indeterminate sx={{ mt: -1 }} />}
                  label={
                    <Stack sx={{ gap: 0.5 }}>
                      <Typography variant="subtitle2">Title will goes here</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Choose the content you want to view.
                      </Typography>
                    </Stack>
                  }
                  sx={{ alignItems: 'flex-start' }}
                />
              </FormGroup>
              <FormGroup sx={{ gap: 2.5 }}>
                <FormControlLabel
                  disabled
                  control={<Checkbox sx={{ mt: -1 }} />}
                  label={
                    <Stack sx={{ gap: 0.5 }}>
                      <Typography variant="subtitle2">Title will goes here</Typography>
                      <Typography variant="caption" color="inherit">
                        Choose the content you want to view.
                      </Typography>
                    </Stack>
                  }
                  sx={{ alignItems: 'flex-start' }}
                />
                <FormControlLabel
                  disabled
                  control={<Checkbox defaultChecked sx={{ mt: -1 }} />}
                  label={
                    <Stack sx={{ gap: 0.5 }}>
                      <Typography variant="subtitle2">Title will goes here</Typography>
                      <Typography variant="caption" color="inherit">
                        Choose the content you want to view.
                      </Typography>
                    </Stack>
                  }
                  sx={{ alignItems: 'flex-start' }}
                />
                <FormControlLabel
                  control={<Checkbox indeterminate sx={{ mt: -1 }} />}
                  label={
                    <Stack sx={{ gap: 0.5 }}>
                      <Typography variant="subtitle2">Title will goes here</Typography>
                      <Typography variant="caption" color="inherit">
                        Choose the content you want to view.
                      </Typography>
                    </Stack>
                  }
                  sx={{ alignItems: 'flex-start' }}
                />
              </FormGroup>
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'corporateEntity'} onChange={handleChange('corporateEntity')}>
          <AccordionSummary aria-controls="corporateEntityd-content" id="corporateEntityd-header">
            <Typography component="span">Corporate Entity</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'individual'} onChange={handleChange('individual')}>
          <AccordionSummary aria-controls="individuald-content" id="individuald-header">
            <Typography component="span">Individual</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'serviceProvider'} onChange={handleChange('serviceProvider')}>
          <AccordionSummary aria-controls="serviceProviderd-content" id="serviceProviderd-header">
            <Typography component="span">Service Provider</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Card>
    </Box>
  );
}
