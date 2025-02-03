import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, Button, Grid, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomInput from '@/utils/CustomInput';
import Factory from '@/utils/Factory';
import { useSnackbar } from '@/components/CustomSnackbar';
import { usePathname, useRouter } from 'next/navigation';

const InvoiceNumberFormat = ({ businessDetailsData, handleBack }) => {
  // State for invoice format data to be manually updated
  const pathname = usePathname();

  const { showSnackbar } = useSnackbar();
  const router = useRouter();
  const [invoiceFormatData, setInvoiceFormatData] = useState({
    startingNumber: '',
    prefix: '',
    suffix: '',
    format_version: ''
  });

  // Initialize formik hook
  const formik = useFormik({
    initialValues: {
      startingNumber: '',
      prefix: '',
      suffix: '',
      format_version: ''
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
          suffix: values.suffix,
          format_version: Number(values.format_version) + 1
        }
      };
      console.log(postData);
      try {
        const { res } = await Factory('put', url, postData);
        if (res.status_cd === 0) {
          showSnackbar('Data Updated Successfully', 'success');
          // router.push(`/invoicing`);
        } else {
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
      formik.setFieldValue('format_version', Number(businessDetailsData.invoice_format.format_version) || '');
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

      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', padding: 0 }}>
        <Button variant="outlined" onClick={handleBack} sx={{ mt: 3 }}>
          Back
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 2 }}>
          <Button onClick={formik.handleSubmit} color="primary" variant="contained">
            Save
          </Button>
          <Button
            onClick={() => {
              router.push(`/invoicing/generateInvoice`);
            }}
            color="primary"
            variant="contained"
            type="button"
          >
            New Invoice
          </Button>
        </Box>
      </DialogActions>
    </Box>
  );
};

export default InvoiceNumberFormat;
