import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Factory from '@/utils/Factory';
import AddItem from './AddItem';
import ActionCell from '@/utils/ActionCell';
import { useSnackbar } from '@/components/CustomSnackbar';

const ItemList = ({ type, setType, handleClose, handleOpen, open, businessDetailsData, itemsData, get_Goods_and_Services_Data }) => {
  const [itemsList, setItemsList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    setItemsList(itemsData);
  }, [itemsData]);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setType('edit');
    handleOpen();
  };

  const handleDelete = async (item) => {
    let url = `/invoicing/goods-services/${item.id}/delete/`;
    const { res } = await Factory('delete', url, {});
    if (res.status_cd === 1) {
      showSnackbar(res.data.message, 'error');
    } else {
      showSnackbar('Data Deleted Successfully', 'success');
      get_Goods_and_Services_Data();
    }
  };

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
                    {/* <IconButton onClick={() => handleEdit(item)}>
                      <EditIcon />
                    </IconButton> */}
                    <ActionCell
                      row={item} // Pass the customer row data
                      onEdit={() => handleEdit(item)} // Edit handler
                      onDelete={() => handleDelete(item)} // Delete handler
                      open={open}
                      onClose={handleClose}
                      deleteDialogData={{
                        title: 'Delete Item',
                        heading: 'Are you sure you want to delete this Item?',
                        description: `This action will remove ${item.name} from the list.`,
                        successMessage: 'Item has been deleted.'
                      }}
                    />
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
      <AddItem
        businessDetailsData={businessDetailsData}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        get_Goods_and_Services_Data={get_Goods_and_Services_Data}
        selectedItem={selectedItem}
        type={type}
        setType={setType}
      />
    </>
  );
};

export default ItemList;
