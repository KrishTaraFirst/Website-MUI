'use client';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
import { IconX } from '@tabler/icons-react';
import { styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Box, Card, Stack, Checkbox, FormControlLabel, FormGroup, Grid2, TextField } from '@mui/material';
import Factory from '@/utils/Factory';
import { useSnackbar } from '@/components/CustomSnackbar';
import Modal from '@/components/Modal';
import { ModalSize } from '@/enum';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useCurrentUser from '@/hooks/useCurrentUser';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const userTypes = {
  individual: 'Individual',
  'ca-firms': 'CA',
  'corporate-entities': 'Business',
  'service-providers': 'ServiceProvider'
};

export default function EditUser({ type, open, setOpen, user_id, setRefresh, user_type, getUsers }) {
  const { showSnackbar } = useSnackbar();
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useCurrentUser();

  const [data, setData] = useState({
    user_name: '',
    first_name: '',
    last_name: '',
    mobile_number: '',
    email: '',
    password: '',
    created_by: userData.id,
    id: user_id || ''
  });
  const [errors, setErrors] = useState({ first_name: '', last_name: '', id: user_id });

  const resetForm = () => {
    setData({ first_name: '', last_name: '', id: user_id });
    setErrors({ first_name: '', last_name: '', id: user_id });
  };

  const handleChange = (field, value) => {
    // Update the data
    setData((prev) => ({
      ...prev,
      [field]: value
    }));

    // Remove the error dynamically while typing
    if (errors[field]) {
      switch (field) {
        case 'first_name':
        case 'last_name':
          if (value.trim().length >= 3 && /^[A-Za-z]+$/.test(value.trim())) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
          }
          break;

        case 'email':
          if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
          }
          break;

        case 'mobile_number':
          if (/^\d{10}$/.test(value.trim())) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
          }
          break;

        case 'password':
          if (value.trim().length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(value.trim())) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
          }
          break;
        case 'user_name':
          if (value.trim().length >= 3 && /^[a-zA-Z0-9_-]+$/.test(value.trim())) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
          }
          break;
        default:
          break;
      }
    }
  };

  const handleBlur = (field, value = '') => {
    let error = '';

    switch (field) {
      case 'first_name':
      case 'last_name':
        const fieldName = field.replace('_', ' '); // Convert 'first_name' to 'first name'
        const capitalizedField = fieldName
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '); // Capitalize both words → "First Name" or "Last Name"

        if (value.trim().length < 3) {
          error = `${capitalizedField} must be at least 3 characters.`;
        } else if (!/^[A-Z][a-zA-Z]+$/.test(value.trim())) {
          error = `${capitalizedField} must start with a capital letter and contain only alphabets.`;
        }
        break;

      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          error = 'Invalid email address.';
        }
        break;

      case 'mobile_number':
        if (!/^\d{10}$/.test(value.trim())) {
          error = 'Mobile number must be 10 digits without spaces.';
        }
        break;

      case 'password':
        if (value.trim().length < 6) {
          error = 'Password must be at least 6 characters.';
        }
        // else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(value.trim())) {
        //   error = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
        // }
        break;
      case 'user_name':
        if (value.trim().length < 3) {
          error = 'Username must be at least 3 characters.';
        } else if (!/^[a-zA-Z0-9_-]+$/.test(value.trim())) {
          error = 'Username can only contain letters, numbers, underscores, and hyphens.';
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: error
    }));

    return error;
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

  const handleSubmit = () => {
    const fieldsToValidate =
      type === 'add' ? ['first_name', 'last_name', 'mobile_number', 'email', 'password', 'user_name'] : ['first_name', 'last_name'];
    let valid = true;

    fieldsToValidate.forEach((field) => {
      const value = data[field];
      let errorVal = handleBlur(field, value);
      if (errorVal) {
        valid = false;
      }
    });
    if (!valid) {
      showSnackbar('Please fix the errors before submitting.', 'error');
      return;
    }

    if (type === 'add') __addUser();
    else __editUser();
  };

  const __addUser = async () => {
    let __data = { ...data };
    __data['user_type'] = userTypes[user_type];
    __data['is_active'] = true;
    delete __data.id;
    let url = `/user_management/admin/user-registration/`;
    const { res } = await Factory('post', url, { ...__data });

    if (res.status_cd === 1) {
      console.log(res.data);
      showSnackbar(JSON.stringify(res.data.data), 'error');
    } else {
      showSnackbar('Saved Successfully', 'success');
      setRefresh((prev) => !prev);
      resetForm();
      setOpen(false);
    }
  };

  const __editUser = async () => {
    let url = `/user_management/update-users-info`;
    let __data = { ...data };
    delete __data.email;
    delete __data.mobile_number;
    delete __data.password;
    const { res } = await Factory('patch', url, { ...__data });

    if (res.status_cd === 1) {
      showSnackbar(res.data.message, 'error');
    } else {
      showSnackbar('Saved Successfully', 'success');
      getUsers();
      resetForm();
      setOpen(false);
    }
  };
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      maxWidth={ModalSize.SM}
      header={{
        title: type === 'add' ? 'Add User' : `Edit User`,
        subheader: type === 'add' ? 'Enter the user details below' : 'You can change name here.'
      }}
      modalContent={
        <Stack direction="column" sx={{ gap: 2 }}>
          {type === 'add' && (
            <Stack direction="column" sx={{ gap: 0.5 }}>
              <Typography variant="subtitle2" sx={{ color: 'grey.800' }}>
                Username
              </Typography>
              <TextField
                id="outlined-disabled"
                value={data.user_name}
                type="text"
                onBlur={(e) => handleBlur('user_name', e.target.value)}
                onChange={(e) => {
                  handleChange('user_name', e.target.value);
                }}
                error={!!errors.user_name}
                helperText={errors.user_name}
              />
            </Stack>
          )}
          <Stack direction="column" sx={{ gap: 0.5 }}>
            <Typography variant="subtitle2" sx={{ color: 'grey.800' }}>
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
            <Typography variant="subtitle2" sx={{ color: 'grey.800' }}>
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
          {type === 'add' && (
            <>
              <Stack direction="column" sx={{ gap: 0.5 }}>
                <Typography variant="subtitle2" sx={{ color: 'grey.800' }}>
                  Mobile
                </Typography>
                <TextField
                  id="outlined-disabled"
                  value={data.mobile_number}
                  type="number"
                  onBlur={(e) => handleBlur('mobile_number', e.target.value)}
                  onChange={(e) => {
                    handleChange('mobile_number', e.target.value);
                  }}
                  error={!!errors.mobile_number}
                  helperText={errors.mobile_number}
                />
              </Stack>

              <Stack direction="column" sx={{ gap: 0.5 }}>
                <Typography variant="subtitle2" sx={{ color: 'grey.800' }}>
                  Email
                </Typography>
                <TextField
                  id="outlined-disabled"
                  value={data.email}
                  onBlur={(e) => handleBlur('email', e.target.value)}
                  onChange={(e) => {
                    handleChange('email', e.target.value);
                  }}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Stack>
              <Stack direction="column" sx={{ gap: 0.5 }}>
                <Typography variant="subtitle2" sx={{ color: 'grey.800' }}>
                  Password
                </Typography>
                <TextField
                  id="outlined-disabled"
                  value={data.password}
                  onBlur={(e) => handleBlur('password', e.target.value)}
                  onChange={(e) => {
                    handleChange('password', e.target.value);
                  }}
                  type={isOpen ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton sx={{ height: 0 }} onClick={() => setIsOpen(!isOpen)} rel="noopener noreferrer" aria-label="eye">
                          {isOpen ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Stack>
            </>
          )}
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
