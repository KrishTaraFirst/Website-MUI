import React, { useState, useEffect } from 'react';
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
import Factory from '@/utils/Factory';
import { useSnackbar } from '@/components/CustomSnackbar';

const unitsDropdown = [
  'Kilograms (Kgs)',
  'Grams (g)',
  'Liters (L)',
  'Milliliters (mL)',
  'Meters (m)',
  'Centimeters (cm)',
  'Millimeters (mm)',
  'Pieces (pcs)',
  'Dozens (doz)',
  'Pairs (prs)',
  'Sets (sets)',
  'Units (units)',
  'Boxes (boxes)',
  'Cartons (ctns)',
  'Barrels (bbls)',
  'Bottles (btls)',
  'Rolls (rolls)',
  'Sheets (Sheets)',
  'Cubic Meters (CBM)',
  'Square Meters (Sq.M)',
  'Square Feet (Sq.Ft)',
  'Tons (Tons)',
  'Quintal (Quintals)',
  'Hours (Hs)',
  'Days (Days)',
  'Packs (Packs)',
  'Bundles (Bundles)'
];
let taxPreferencesDropdown = ['Taxable', 'Non-Taxable', 'Out of Scope', 'Non-GST Supply'];
const gstRatesDropdown = ['0', '5', '12', '18', '28'];
const hsnCodes = [
  '1006', // Rice (other than basmati)
  '6203', // Men's or boys' trousers, bib and brace overalls, etc. (cotton)
  '8528', // LCD/LED Televisions
  '9401', // Chairs and other seating furniture (wooden)
  '8703' // Motor cars and other motor vehicles designed for the transport of persons (with engine capacity <= 1500 cc)
];

const AddItem = ({ type, setType, open, handleOpen, handleClose, selectedItem, businessDetailsData, get_Goods_and_Services_Data }) => {
  const [addItemData] = useState([
    { name: 'type', label: 'Type' },
    { name: 'name', label: 'Name' },
    { name: 'sku_value', label: 'SKU' },
    { name: 'units', label: 'Units' },
    { name: 'hsn_sac', label: 'HSN/SAC Code' },
    { name: 'gst_rate', label: 'GST Rate' },
    { name: 'tax_preference', label: 'Tax Preference' },
    { name: 'selling_price', label: 'Selling Price' },
    { name: 'description', label: 'Description' }
  ]);
  const { showSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      type: 'Goods',
      name: '',
      sku_value: '',
      units: '',
      hsn_sac: '',
      gst_rate: '',
      tax_preference: '',
      selling_price: '',
      description: ''
    },
    validationSchema: Yup.object({
      type: Yup.string().required('Required'),
      name: Yup.string().required('Required'),
      sku_value: Yup.number()
        .typeError('SKU Value must be an integer')
        .required('SKU Value is required')
        .integer('SKU Value must be an integer'),
      units: Yup.string().required('Units is Required'),
      hsn_sac: Yup.string().required('HSN/SAC Code is Required'),
      gst_rate: Yup.string().required('GST Rate is Required'),
      tax_preference: Yup.string().required(' Tax Preference is Required'),
      selling_price: Yup.number()
        .typeError('Selling Price must be an integer')
        .required('Selling Price is required')
        .integer('Selling Price must be an integer'),
      description: Yup.string().required('Selling Price Required')
    }),
    onSubmit: async (values) => {
      const postData = { ...values };
      postData.invoicing_profile = businessDetailsData.id;
      postData.sku_value = Number(postData.sku_value);
      postData.gst_rate = Number(postData.gst_rate);
      postData.selling_price = Number(postData.selling_price);
      console.log(postData);
      let post_url = '/invoicing/api/v1/goods-services/create/';
      const put_url = `/invoicing/goods-services/${selectedItem?.id}/update/`;

      let url = type === 'edit' ? put_url : post_url;
      let method = type === 'edit' ? 'put' : 'post';

      try {
        const { res, error } = await Factory(method, url, postData);

        if (res.status_cd === 0) {
          get_Goods_and_Services_Data();
          setType('');
          resetForm();
          handleClose();
          showSnackbar(type === 'edit' ? 'Data Updated Successfully' : 'Data Added Successfully', 'success');
        }
      } catch (error) {
        console.error('Error:', error);
        showSnackbar(JSON.stringify(error), 'error');
      }
    }
  });

  const { values, setValues, touched, errors, handleSubmit, setFieldValue, handleBlur, resetForm } = formik;
  useEffect(() => {
    if (type === 'edit' && selectedItem) {
      setValues((prevValues) => ({
        ...prevValues, // Retain other values in the form
        type: selectedItem.type || prevValues.type,
        name: selectedItem.name || '',
        sku_value: selectedItem.sku_value || '',
        units: selectedItem.units || '',
        hsn_sac: selectedItem.hsn_sac || '',
        gst_rate: selectedItem.gst_rate || '',
        tax_preference: selectedItem.tax_preference || '',
        selling_price: selectedItem.selling_price || '',
        description: selectedItem.description || ''
      }));
    }
  }, [type, selectedItem]);

  const renderOptions = values.type === 'Goods' ? unitsDropdown : ['NA'];

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title" fullWidth maxWidth="sm">
      <Box sx={{ m: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <DialogTitle id="form-dialog-title" sx={{ fontWeight: 'bold' }}>
            {type === 'edit' ? 'Edit Item' : ' Add New Item'}
          </DialogTitle>
          <IconButton
            variant="outlined"
            color="secondary"
            aria-label="close"
            onClick={() => {
              setType('');
              resetForm();
              handleClose();
            }}
          >
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
                <Grid item xs={12} sm={6} key={item.name}>
                  {item.name === 'type' ? (
                    <FormControl fullWidth>
                      <FormLabel>{item.label}</FormLabel>
                      <RadioGroup
                        name={item.name}
                        value={values.type}
                        onChange={(e) => {
                          setFieldValue('type', e.target.value);
                          if (e.target.value === 'Service') {
                            setFieldValue('units', 'NA');
                          }
                          if (e.target.value === 'Goods') {
                            setFieldValue('units', '');
                          }
                        }}
                        row
                      >
                        <FormControlLabel value="Service" control={<Radio />} label="Service" />
                        <FormControlLabel value="Goods" control={<Radio />} label="Goods" />
                      </RadioGroup>
                    </FormControl>
                  ) : item.name === 'units' || item.name === 'gst_rate' || item.name === 'tax_preference' || item.name === 'hsn_sac' ? (
                    <>
                      <div style={{ paddingBottom: '5px' }}>
                        <label>{item.label}</label>
                      </div>
                      <CustomAutocomplete
                        value={values[item.name]}
                        onChange={(_, newValue) => {
                          setFieldValue(item.name, newValue);
                        }}
                        options={
                          item.name === 'gst_rate'
                            ? gstRatesDropdown
                            : item.name === 'tax_preference'
                              ? taxPreferencesDropdown
                              : item.name === 'hsn_sac'
                                ? hsnCodes
                                : renderOptions
                        }
                        getOptionLabel={(option) => option} // Use option directly if it's a string
                        error={touched[item.name] && Boolean(errors[item.name])}
                        helperText={touched[item.name] && errors[item.name]}
                        name={item.name}
                      />
                    </>
                  ) : (
                    <>
                      <div style={{ paddingBottom: '5px' }}>
                        <label>{item.label}</label>
                      </div>
                      <CustomInput
                        name={item.name}
                        placeholder={item.name === 'selling_price' ? '₹' : ''}
                        value={values[item.name]}
                        onChange={(e) => setFieldValue(item.name, e.target.value)}
                        onBlur={handleBlur}
                        error={touched[item.name] && Boolean(errors[item.name])}
                        helperText={touched[item.name] && errors[item.name]}
                        textColor={type === 'edit' && '#776080'}
                      />
                    </>
                  )}
                </Grid>
              ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3, gap: 5 }}>
              <Button variant="contained" type="submit">
                {type === 'edit' ? 'Update Item' : 'Add Item'}
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default AddItem;
