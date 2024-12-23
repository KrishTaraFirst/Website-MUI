import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
import CustomInput from '@/utils/CustomInput';
import CustomAutocomplete from '@/utils/CustomAutocomplete';
import { IconX } from '@tabler/icons-react';
import IconButton from '@mui/material/IconButton';

const AddItem = ({ open, onClose }) => {
  const [addItemData] = useState([
    { name: 'type', label: 'Type' },
    { name: 'item_name', label: 'Name' },
    { name: 'sku', label: 'SKU ' },
    { name: 'units', label: 'Units' },
    { name: 'hsn_sac', label: 'HSN/SAC Code' },
    { name: 'gst_rate', label: 'GST Rate' },
    { name: 'tax_preference', label: 'Tax Preference' },
    { name: 'selling_price', label: 'Selling Price' },
    { name: 'description', label: 'Description' }
  ]);

  const formik = useFormik({
    initialValues: {
      type: '',
      item_name: '',
      sku: '',
      units: '',
      hsn_sac: '',
      gst_rate: '',
      tax_preference: '',
      selling_price: '',
      description: ''
    },
    validationSchema: Yup.object({
      type: Yup.string().required('Required'),
      item_name: Yup.string().required('Required'),
      sku: Yup.string().required('Required'),
      units: Yup.string().required('Required'),
      hsn_sac: Yup.string().required('Required'),
      gst_rate: Yup.string().required('Required'),
      tax_preference: Yup.string().required('Required'),
      selling_price: Yup.string().required('Required'),
      description: Yup.string().required('Required')
    }),
    onSubmit: (values) => {
      console.log(values);
      onClose();
    }
  });

  const { values, touched, errors, handleSubmit, handleChange, handleBlur } = formik;

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="sm">
      <Box sx={{ m: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <DialogTitle id="form-dialog-title" sx={{ fontWeight: 'bold' }}>
            Add New Item
          </DialogTitle>

          <IconButton variant="outlined" color="secondary" aria-label="close" onClick={onClose}>
            <IconX size={20} />
          </IconButton>
        </Box>
        <Divider />
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Item Details
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {addItemData.map((item) => (
                <Grid item xs={6} key={item.name}>
                  {item.name === 'type' ? (
                    <FormControl fullWidth>
                      <FormLabel>{item.label}</FormLabel>
                      <RadioGroup name={item.name} value={values.gst_registered} onChange={handleChange} row>
                        <FormControlLabel value="Service" control={<Radio />} label="Service" />
                        <FormControlLabel value="Goods" control={<Radio />} label="Goods" />
                      </RadioGroup>
                    </FormControl>
                  ) : item.name === 'typeof_gst' ? (
                    <>
                      <div style={{ paddingBottom: '5px' }}>
                        <label>{item.label}</label>
                      </div>{' '}
                      <CustomAutocomplete
                        value={values[item.name]}
                        onChange={handleChange}
                        options={['CGST', 'IGST']}
                        error={touched[item.name] && Boolean(errors[item.name])}
                        helperText={touched[item.name] && errors[item.name]}
                        name={item.name}
                      />
                    </>
                  ) : (
                    <>
                      <div style={{ paddingBottom: '5px' }}>
                        <label>{item.label}</label>
                      </div>{' '}
                      <CustomInput
                        name={item.name}
                        value={values[item.name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched[item.name] && Boolean(errors[item.name])}
                        helperText={touched[item.name] && errors[item.name]}
                      />
                    </>
                  )}
                </Grid>
              ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3, gap: 5 }}>
              <Button variant="contained" type="submit">
                Add Item
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default AddItem;
