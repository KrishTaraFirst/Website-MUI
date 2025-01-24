'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box, Card, Stack, Checkbox, FormControlLabel, FormGroup } from '@mui/material';

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

const Checkboxes = () => {
  return (
    <>
      <FormControlLabel
        control={<Checkbox defaultChecked disabled size="medium" sx={{ mt: -0.5 }} />}
        label={
          <Stack sx={{ gap: 0.5 }}>
            <Typography variant="h6">Invoicing</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Choose the content you want to view.
            </Typography>
          </Stack>
        }
        sx={{ alignItems: 'flex-start', mb: 3 }}
      />
      <Stack direction="row" sx={{ alignItems: 'flex-start', ml: 3, gap: 4, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
        <FormGroup sx={{ gap: 2.5 }}>
          <FormControlLabel
            control={<Checkbox disabled defaultChecked size="medium" sx={{ mt: -1 }} />}
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
            control={<Checkbox disabled size="medium" defaultChecked sx={{ mt: -1 }} />}
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
            control={<Checkbox disabled size="medium" defaultChecked sx={{ mt: -1 }} />}
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
            control={<Checkbox disabled defaultChecked sx={{ mt: -1 }} />}
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
            control={<Checkbox disabled defaultChecked sx={{ mt: -1 }} />}
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
            control={<Checkbox disabled defaultChecked sx={{ mt: -1 }} />}
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
            control={<Checkbox disabled defaultChecked size="medium" sx={{ mt: -1 }} />}
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
            control={<Checkbox disabled size="medium" defaultChecked sx={{ mt: -1 }} />}
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
            control={<Checkbox disabled size="medium" defaultChecked sx={{ mt: -1 }} />}
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
            control={<Checkbox disabled size="medium" defaultChecked sx={{ mt: -1 }} />}
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
            control={<Checkbox disabled size="medium" defaultChecked sx={{ mt: -1 }} />}
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
            control={<Checkbox disabled size="medium" defaultChecked sx={{ mt: -1 }} />}
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

      <FormControlLabel
        control={<Checkbox disabled size="medium" defaultChecked sx={{ mt: -0.5 }} />}
        label={
          <Stack sx={{ gap: 0.5 }}>
            <Typography variant="h6">Visa Services</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Choose the content you want to view.
            </Typography>
          </Stack>
        }
        sx={{ alignItems: 'flex-start', mb: 3, mt: 4 }}
      />
      <Stack direction="row" sx={{ alignItems: 'flex-start', ml: 3, gap: 4, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
        <FormGroup sx={{ gap: 2.5 }}>
          <FormControlLabel
            control={<Checkbox disabled size="medium" defaultChecked sx={{ mt: -1 }} />}
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
            control={<Checkbox disabled size="medium" defaultChecked sx={{ mt: -1 }} />}
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
            control={<Checkbox disabled size="medium" defaultChecked sx={{ mt: -1 }} />}
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
            control={<Checkbox disabled size="medium" defaultChecked sx={{ mt: -1 }} />}
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
            control={<Checkbox disabled size="medium" defaultChecked sx={{ mt: -1 }} />}
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
            control={<Checkbox disabled size="medium" defaultChecked sx={{ mt: -1 }} />}
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
            control={<Checkbox disabled size="medium" defaultChecked sx={{ mt: -1 }} />}
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
            control={<Checkbox disabled size="medium" defaultChecked sx={{ mt: -1 }} />}
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
            control={<Checkbox disabled size="medium" defaultChecked sx={{ mt: -1 }} />}
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
            control={<Checkbox disabled size="medium" defaultChecked sx={{ mt: -1 }} />}
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
            control={<Checkbox disabled size="medium" defaultChecked sx={{ mt: -1 }} />}
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
            control={<Checkbox disabled size="medium" defaultChecked sx={{ mt: -1 }} />}
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
    </>
  );
};
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
            <Checkboxes />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'corporateEntity'} onChange={handleChange('corporateEntity')}>
          <AccordionSummary aria-controls="corporateEntityd-content" id="corporateEntityd-header">
            <Typography component="span">Corporate Entity</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Checkboxes />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'individual'} onChange={handleChange('individual')}>
          <AccordionSummary aria-controls="individuald-content" id="individuald-header">
            <Typography component="span">Individual</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Checkboxes />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'serviceProvider'} onChange={handleChange('serviceProvider')}>
          <AccordionSummary aria-controls="serviceProviderd-content" id="serviceProviderd-header">
            <Typography component="span">Service Provider</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Checkboxes />
          </AccordionDetails>
        </Accordion>
      </Card>
    </Box>
  );
}
