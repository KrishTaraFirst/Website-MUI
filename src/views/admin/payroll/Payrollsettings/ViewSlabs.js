'use client';
import React, { useEffect, useState } from 'react';
import { Button, Box, TextField, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Modal from '@/components/Modal';
import { ModalSize } from '@/enum';

function ViewSlabs({ viewSlabsDialog, setViewSlabsDialog, selectedRecord, setSelectedRecord }) {
  return (
    <Modal
      open={viewSlabsDialog}
      maxWidth={ModalSize.LG}
      header={{ title: ' Professional Tax Slabs', subheader: '' }}
      modalContent={
        <Box sx={{ padding: 2 }}>
          <Box sx={{ mt: 3 }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>Start Range</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>End Range</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>Monthly Tax Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedRecord?.slab?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <TextField fullWidth value={item.min_salary} x />
                      </TableCell>
                      <TableCell>
                        <TextField fullWidth value={item.max_salary} />
                      </TableCell>
                      <TableCell>
                        <TextField fullWidth value={item.pt_amount} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      }
      footer={
        <Stack direction="row" sx={{ width: 1, justifyContent: 'space-between', gap: 2 }}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setViewSlabsDialog(false);
              setSelectedRecord(null);
            }}
          >
            Cancel
          </Button>
        </Stack>
      }
    />
  );
}

export default ViewSlabs;
