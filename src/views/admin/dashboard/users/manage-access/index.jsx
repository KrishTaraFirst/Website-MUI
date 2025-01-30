'use client';
import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import { IconX } from '@tabler/icons-react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box, Card, Stack, Checkbox, FormControlLabel, FormGroup, Grid2 } from '@mui/material';
import { useSnackbar } from '@/components/CustomSnackbar';
import Factory from '@/utils/Factory';

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
  padding: `${theme.spacing(4)} ${theme.spacing(2)}`,
  borderTop: '1px solid rgba(0, 0, 0, .125)'
}));

const Checkboxes = ({ data = [], checkedItems, setCheckedItems, type }) => {
  const handleCheckboxChange = (key) => (event) => {
    setCheckedItems((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [key]: event.target.checked
      }
    }));
  };

  // Handle "Select All" change
  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    const updatedCheckedItems = {};
    data.forEach((item) => {
      updatedCheckedItems[item.key] = isChecked;
    });
    setCheckedItems((prev) => ({
      ...prev,
      [type]: updatedCheckedItems
    }));
  };

  // Check if all items are selected
  const allSelected = data.length > 0 && data.every((item) => checkedItems[type]?.[item.key]);
  const someSelected = data.some((item) => checkedItems[type]?.[item.key]) && !allSelected;

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox size="medium" sx={{ mt: -0.7 }} checked={allSelected} indeterminate={someSelected} onChange={handleSelectAllChange} />
        }
        label={
          <Stack sx={{ gap: 0.5 }}>
            <Typography variant="subtitle1">Select All</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Check to select or deselect all actions
            </Typography>
          </Stack>
        }
        sx={{ alignItems: 'flex-start', mb: 3 }}
      />
      <Stack
        direction="row"
        sx={{
          alignItems: 'flex-start',
          ml: 3,
          gap: 4,
          flexWrap: { xs: 'wrap', sm: 'nowrap' }
        }}
      >
        <Grid2 container rowSpacing={2} columnSpacing={1}>
          {data.map((item, idx) => (
            <Grid2 key={idx} size={{ xs: 12, sm: 6, md: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="medium"
                    sx={{ mt: -1 }}
                    checked={!!checkedItems[type]?.[item.key]}
                    onChange={handleCheckboxChange(item.key)}
                  />
                }
                label={
                  <Stack sx={{ gap: 0.5 }}>
                    <Typography variant="subtitle2">{item.label}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {item.description}
                    </Typography>
                  </Stack>
                }
                sx={{ alignItems: 'flex-start' }}
              />
            </Grid2>
          ))}
        </Grid2>
      </Stack>
    </>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function ManageAccess({ open, setOpen }) {
  const [expanded, setExpanded] = React.useState('visa-services');
  const { showSnackbar } = useSnackbar();
  const [checkedItems, setCheckedItems] = React.useState({});
  const [permissions, setPermissions] = React.useState({ VisaServices: [], Invoicing: [] });

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    console.log(checkedItems);
    setOpen(false);
  };

  async function getPermissions() {
    let url = `/user_management/permissions/`;
    const { res } = await Factory('get', url, {});
    if (res.status_cd === 0) {
      console.log(res);
      setPermissions(res.data);
    } else {
      showSnackbar(JSON.stringify(res.data), 'error');
    }
  }

  async function getUserPermissions() {
    let url = `/user_management/permissions/`;
    const { res } = await Factory('get', url, {});
    if (res.status_cd === 0) {
      console.log(res);
      setPermissions(res.data);
    } else {
      showSnackbar(JSON.stringify(res.data), 'error');
    }
  }

  useEffect(() => {
    getPermissions();
    getUserPermissions();
  }, []);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      keepMounted
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)' // Black tint
        }
      }}
      sx={{
        '& .MuiDialog-paper': {
          width: '70%', // Take up 50% of the screen width
          height: '100%', // Full height
          position: 'fixed',
          right: 0, // Align to the right
          margin: 0
        }
      }}
    >
      <DialogTitle>
        <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
          <Stack direction="column" sx={{ gap: 0.5 }}>
            <Typography variant="h4" sx={{ fontWeight: 400 }}>
              Manage Access
            </Typography>
            <Typography variant="caption" sx={{ color: 'grey.700' }}>
              Tagline for manage access
            </Typography>
          </Stack>
          <IconButton variant="outlined" sx={{ p: 0 }} color="secondary" aria-label="close" onClick={handleClose}>
            <IconX size={24} />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Box>
          <Card sx={{ borderRadius: 2, border: '1px solid #dfdfdf' }}>
            <Accordion expanded={expanded === 'visa-services'} onChange={handleChange('visa-services')}>
              <AccordionSummary aria-controls="visa-servicesd-content" id="visa-servicesd-header">
                <Typography component="span">Visa Services</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Checkboxes
                  data={permissions.VisaServices}
                  type={'visaServices'}
                  checkedItems={checkedItems}
                  setCheckedItems={setCheckedItems}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'invoicing'} onChange={handleChange('invoicing')}>
              <AccordionSummary aria-controls="invoicingd-content" id="invoicingd-header">
                <Typography component="span">Invoicing</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Checkboxes data={permissions.Invoicing} type={'invoicing'} checkedItems={checkedItems} setCheckedItems={setCheckedItems} />
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'payroll'} onChange={handleChange('payroll')}>
              <AccordionSummary aria-controls="payrolld-content" id="payrolld-header">
                <Typography component="span">Payroll</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Checkboxes type="payroll" />
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'tds-tcs'} onChange={handleChange('tds-tcs')}>
              <AccordionSummary aria-controls="tds-tcsd-content" id="tds-tcsd-header">
                <Typography component="span">TDS/TCS</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Checkboxes type="tds-tcs" />
              </AccordionDetails>
            </Accordion>
          </Card>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <Button color="error" variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
