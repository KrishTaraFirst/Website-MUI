import React, { useState, useEffect } from 'react';
import RenderTable from './RenderTable';
import {} from '@mui/material';
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
  const body_keys = [
    'employee_name',
    'department',
    'designation',
    'exit_date',
    'total_days',
    'paid_days',
    'settlement_sdate',
    'annual_ctc',
    'final_settlement_amount'
  ];
  const [payrollid, setPayrollId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exitsData, setExitsData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

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
    const url = `/payroll/payroll-exit-settlement?payroll_id=${payrollid}`;
    const { res, error } = await Factory('get', url, {});
    setLoading(false);
    console.log(res);
    if (res.status_cd === 0) {
      setExitsData(res.data || []);
    } else {
      showSnackbar(JSON.stringify(res.data.data), 'error');
    }
  };
  const handleEdit = async (item) => {
    let url = `/payroll/employee-exit/${item.id}`;
    const { res } = await Factory('get', url, {});
    if (res.status_cd === 1) {
      showSnackbar(JSON.stringify(res.data), 'error');
    } else {
      setSelectedRecord(res.data);
      setOpenDialog(true);
    }
  };
  const handleDelete = async (item) => {
    let url = `/payroll/employee-exit/${item.id}`;
    const { res } = await Factory('delete', url, {});
    if (res.status_cd === 1) {
      showSnackbar(JSON.stringify(res.data), 'error');
    } else {
      showSnackbar('Record Deleted Successfully', 'success');
      fetch_exits_Data();
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
        tableData={exitsData}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        body_keys={body_keys}
        selectedRecord={selectedRecord}
        setSelectedRecord={setSelectedRecord}
      />
      <RenderDialog
        from={from}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        fields={fields}
        selectedRecord={selectedRecord}
        setExitsData={setExitsData}
        setLoading={setLoading}
        employeeMasterData={employeeMasterData}
        fetch_exits_Data={fetch_exits_Data}
      />
    </>
  );
}
