import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, Button, Grid, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomInput from '@/utils/CustomInput';
import Factory from '@/utils/Factory';
import { useSnackbar } from '@/components/CustomSnackbar';

const InvoiceNumberFormatDialogue = ({ businessDetailsData }) => {
  // State for invoice format data to be manually updated
  const { showSnackbar } = useSnackbar();

  const [invoiceFormatData, setInvoiceFormatData] = useState({
    startingNumber: '',
    prefix: '',
    suffix: ''
  });

  // Initialize formik hook
  const formik = useFormik({
    initialValues: {
      startingNumber: '',
      prefix: '',
      suffix: ''
    },
    validationSchema: Yup.object({
      startingNumber: Yup.number()
        .typeError('Invoice starting number must be an integer')
        .required('Invoice starting number is required')
        .integer('Invoice starting number must be an integer'),
      prefix: Yup.string(),
      suffix: Yup.string()
    }),
    onSubmit: async (values) => {
      const url = `/invoicing/invoicing-profiles/${businessDetailsData?.id}/update/`;

      const postData = {
        invoice_format: {
          startingNumber: values.startingNumber,
          prefix: values.prefix,
          suffix: values.suffix
        }
      };

      try {
        const { res } = await Factory('put', url, postData);
        if (res.status_cd === 0) {
          showSnackbar('Data Updated Successfully', 'success');
        } else {
          // Handle failure scenario based on status_cd (if needed)
          showSnackbar('Failed to update data', 'error');
        }
      } catch (error) {
        // Catch and log any errors during the request
        console.error('Error:', error);
        showSnackbar('An error occurred during the request', 'error');
      }
    }
  });

  // Update formik values when businessDetailsData changes
  useEffect(() => {
    if (businessDetailsData?.invoice_format) {
      setInvoiceFormatData(businessDetailsData.invoice_format);

      // Using setFieldValue to update formik values on first render or when data changes
      formik.setFieldValue('startingNumber', businessDetailsData.invoice_format.startingNumber || '');
      formik.setFieldValue('prefix', businessDetailsData.invoice_format.prefix || '');
      formik.setFieldValue('suffix', businessDetailsData.invoice_format.suffix || '');
    }
  }, [businessDetailsData, formik.setFieldValue]); // Ensure this runs when `businessDetailsData` changes

  // Custom onChange to update formik field value directly using setFieldValue
  const handleFieldChange = (name) => (event) => {
    const value = event.target.value;
    formik.setFieldValue(name, value); // Update individual fields with setFieldValue
  };

  return (
    <Box sx={{}}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <label htmlFor="startingNumber" style={{ marginRight: '8px' }}>
                Invoice Starting Number:
              </label>
              <CustomInput
                name="startingNumber"
                value={formik.values.startingNumber}
                onChange={handleFieldChange('startingNumber')} // Custom onChange
                onBlur={formik.handleBlur}
                textColor="#777680"
                sx={{ flex: 1 }}
                error={formik.touched.startingNumber && Boolean(formik.errors.startingNumber)}
                helperText={formik.touched.startingNumber && formik.errors.startingNumber}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={12}>
            <h2>Custom Settings:</h2>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <label htmlFor="prefix" style={{ marginRight: '8px' }}>
                Prefix:
              </label>
              <CustomInput
                name="prefix"
                value={formik.values.prefix}
                onChange={handleFieldChange('prefix')} // Custom onChange
                onBlur={formik.handleBlur}
                textColor="#777680"
                sx={{ flex: 1 }}
                error={formik.touched.prefix && Boolean(formik.errors.prefix)}
                helperText={formik.touched.prefix && formik.errors.prefix}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <label htmlFor="suffix" style={{ marginRight: '8px' }}>
                Suffix:
              </label>
              <CustomInput
                name="suffix"
                value={formik.values.suffix}
                onChange={handleFieldChange('suffix')} // Custom onChange
                onBlur={formik.handleBlur}
                textColor="#777680"
                sx={{ flex: 1 }}
                error={formik.touched.suffix && Boolean(formik.errors.suffix)}
                helperText={formik.touched.suffix && formik.errors.suffix}
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', padding: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button onClick={formik.handleSubmit} color="primary" variant="contained">
            Save
          </Button>
        </Box>
      </DialogActions>
    </Box>
  );
};

export default InvoiceNumberFormatDialogue;
