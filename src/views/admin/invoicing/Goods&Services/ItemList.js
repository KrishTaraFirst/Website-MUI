import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ItemEditDialog from './ItemEditDialog';
import Factory from '@/utils/Factory';

const ItemList = ({ itemsData, get_Goods_and_Services_Data }) => {
  const [itemsList, setItemsList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    setItemsList(itemsData);
  }, [itemsData]);

  const handleEdit = (itemIndex) => {
    setSelectedItem(itemsList[itemIndex]);
    setOpenDialog(true);
  };

  const handleDelete = async (item) => {
    let url = `/invoicing/goods-services/${item.id}/delete/`;
    const { res } = await Factory('delete', url, {});
    console.log(res);
    get_Goods_and_Services_Data();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSave = (updatedItem) => {
    const updatedItems = itemsList.map((item) => (item === selectedItem ? updatedItem : item));
    setItemsList(updatedItems);
    setOpenDialog(false);
  };
  console.log(itemsList);
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>GST%</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemsList.length > 0 ? (
              itemsList.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.sku_value}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.gst_rate}</TableCell>
                  <TableCell>{item.selling_price}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No items available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <ItemEditDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        itemData={selectedItem}
        handleSave={handleSave}
        get_Goods_and_Services_Data={get_Goods_and_Services_Data}
      />
    </>
  );
};

export default ItemList;
