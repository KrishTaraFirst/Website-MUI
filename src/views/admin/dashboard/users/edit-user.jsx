'use client';
import React, { useEffect, useState } from 'react';
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
import { Box, Card, Stack, Checkbox, FormControlLabel, FormGroup, Grid2, TextField } from '@mui/material';
import Factory from '@/utils/Factory';
import { useSnackbar } from '@/components/CustomSnackbar';
import Modal from '@/components/Modal';
import { ModalSize } from '@/enum';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export default function EditUser({ open, setOpen, user_id, getUsers }) {
  const { showSnackbar } = useSnackbar();

  const [data, setData] = useState({ first_name: '', last_name: '', id: user_id });
  const [errors, setErrors] = useState({ first_name: '', last_name: '', id: user_id });

  const resetForm = () => {
    setData({ first_name: '', last_name: '', id: user_id });
    setErrors({ first_name: '', last_name: '', id: user_id });
  };

  const handleChange = (field, value) => {
    setData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBlur = (field, value) => {
    if (value.trim().length < 3) {
      setErrors((prev) => ({
        ...prev,
        [field]: `${field.replace('_', ' ')} must be at least 3 characters.`
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      id: user_id
    }));
  }, [user_id]);

  const handleSubmit = async () => {
    let url = `/user_management/update-users-info`;
    const { res } = await Factory('patch', url, { ...data });
    if (res.status_cd === 1) {
      showSnackbar(res.data.message, 'error');
    } else {
      showSnackbar('Saved Successfully', 'success');
      getUsers();
    }
    resetForm();
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      maxWidth={ModalSize.SM}
      header={{ title: 'Edit User', subheader: 'You can change name here.' }}
      modalContent={
        <Stack direction="column" sx={{ gap: 2 }}>
          <Stack direction="column" sx={{ gap: 0.5 }}>
            <Typography variant="subtitle1" sx={{ color: 'grey.800' }}>
              First Name
            </Typography>
            <TextField
              id="outlined-required"
              value={data.first_name}
              onBlur={(e) => handleBlur('first_name', e.target.value)}
              onChange={(e) => {
                handleChange('first_name', e.target.value);
              }}
              error={!!errors.first_name}
              helperText={errors.first_name}
            />
          </Stack>
          <Stack direction="column" sx={{ gap: 0.5 }}>
            <Typography variant="subtitle1" sx={{ color: 'grey.800' }}>
              Last Name
            </Typography>
            <TextField
              id="outlined-disabled"
              value={data.last_name}
              onBlur={(e) => handleBlur('last_name', e.target.value)}
              onChange={(e) => {
                handleChange('last_name', e.target.value);
              }}
              error={!!errors.last_name}
              helperText={errors.last_name}
            />
          </Stack>
        </Stack>
      }
      footer={
        <Stack direction="row" sx={{ width: 1, justifyContent: 'space-between', gap: 2 }}>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Stack>
      }
    />
  );
}
