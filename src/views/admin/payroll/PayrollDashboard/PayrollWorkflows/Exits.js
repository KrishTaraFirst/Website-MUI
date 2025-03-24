import React, { useState, useEffect } from 'react';
import RenderTable from './RenderTable';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Stack,
  Grid2,
  Pagination,
  Box
} from '@mui/material';
import Factory from '@/utils/Factory';
import { useSearchParams } from 'next/navigation';
import { useSnackbar } from '@/components/CustomSnackbar';
import RenderDialog from './RenderDialog';

export default function Exits({ employeeMasterData, from, openDialog, fields, setOpenDialog }) {
  const headerData = [
    'Employee Name',
    'Department',
    'Designations',
    'Exit Date',
    'Total Days',
    'Paid Days',
    'Settlement Date',
    'Actual CTC',
    'F & F'
  ];
  const [payrollid, setPayrollId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exitsData, setExitsData] = useState([]);
  const { showSnackbar } = useSnackbar();

  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get('payrollid');
    if (id) {
      setPayrollId(id);
    }
  }, [searchParams]);

  const fetch_exits_Data = async () => {
    setLoading(true);
    const url = `/payroll/employee-exit/${payrollid}`;
    const { res, error } = await Factory('get', url, {});
    setLoading(false);

    if (res.status_cd === 0) {
      setExitsData(res.data || []);
    } else {
      showSnackbar(JSON.stringify(res.data.data), 'error');
    }
  };
  useEffect(() => {
    if (payrollid) {
      fetch_exits_Data();
    }
  }, [payrollid]);
  return (
    <>
      <RenderTable
        headerData={headerData}
        // tableData={newJoinersData}
        // loading={loading}
        // body_keys={body_keys}
      />
      <RenderDialog
        from={from}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        fields={fields}
        // loading={loading}
        setExitsData={setExitsData}
        setLoading={setLoading}
        employeeMasterData={employeeMasterData}
      />
    </>
  );
}
