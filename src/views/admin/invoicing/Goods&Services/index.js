import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IconPlus } from '@tabler/icons-react';
import AddItem from './AddItem'; // Import the AddCustomer component
import ItemList from './ItemList';
import Factory from '@/utils/Factory';
export default function TabThree({ businessDetails, onNext }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const get_Goods_and_Services_Data = async () => {
    let url = `/invoicing/goods-services/${businessDetails.id}`;
    const { res } = await Factory('get', url, {});
    if (res.status_cd === 0) {
      setItems(res.data.goods_and_services);
    }
  };

  useEffect(() => {
    get_Goods_and_Services_Data();
  }, []);
  console.log(items);
  return (
    <Stack spacing={2}>
      <Grid container spacing={2}>
        {' '}
        <Grid item xs={12}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
            <Typography variant="h6">Items</Typography>
            <Button variant="contained" startIcon={<IconPlus size={16} />} onClick={handleOpen}>
              Add Item
            </Button>
            <AddItem
              businessDetailsData={businessDetails}
              open={open}
              onClose={handleClose}
              get_Goods_and_Services_Data={get_Goods_and_Services_Data}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <ItemList itemsData={items} get_Goods_and_Services_Data={get_Goods_and_Services_Data} />
        </Grid>
      </Grid>
    </Stack>
  );
}
